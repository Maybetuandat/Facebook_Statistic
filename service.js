const connectdb = require("./configdb")
const getAllData = async (req, res) => {
    const data = { list_friend_non_interaction: null, total_friend: null, non_interaction: null, total_interaction: null, new_friend: null, status: null }

    try {
        const db = await connectdb();
        const collection = db.collection('list_friend_react');
        // const users = await collection.find({}).project({ idUser: 1, name: 1, react: 1, _id: 0, comment: 1 }).toArray();
        const users = await collection.aggregate([
            {
                $project: {
                    idUser: 1,
                    name: 1,
                    react: 1,
                    comment: 1,
                    total: { $sum: ["$comment", "$react"] }  // Compute the sum of comment and react
                }
            },
            {
                $sort: { total: 1 }  // Sort by the total in descending order
            },
            {
                $project: {
                    idUser: 1,
                    name: 1,
                    react: 1,
                    comment: 1,
                    _id: 0  // Remove the _id field
                }
            }
        ]).toArray();


        data.list_friend_non_interaction = users;
        data.non_interaction = users.length;
        const total_interaction = await collection.aggregate([
            {
                $group: {
                    _id: null,
                    totalReact: { $sum: "$react" }
                }
            }
        ]).toArray();
        if (total_interaction.length > 0)
            data.total_interaction = total_interaction[0].totalReact;
        else
            data.total_interaction = 0;
        const now = new Date();

        // Tính thời gian một tuần trước
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);

        // Truy vấn số lượng bạn bè mới thêm vào trong khoảng thời gian một tuần trở lại đây
        const count = await collection.countDocuments({
            comment: { $gt: 0 }
        });

        data.new_friend = count;




        const total_friend = await collection.countDocuments();
        data.total_friend = total_friend;
        data.status = 200
    } catch (error) {
        console.log(error);
        data.status = 500;
    }
    return data

}
const getListFriendInteraction = async (req, res) => {
    const data = { name: null, react: null, status: null }
    try {
        const db = await connectdb();
        const collection = db.collection('list_friend_react');

        const users = await collection.find(
            { react: { $gt: 0 } },
            { projection: { _id: 0, name: 1, react: 1 } }
        ).toArray();
        users.sort((a, b) => b.react - a.react);
        var name = []
        var react = []
        for (let i = 0; i < users.length; i++) {
            if (i == 5) break;
            name.push(users[i].name)
            react.push(users[i].react)
        }
        data.name = name
        data.react = react
        data.status = 200;
    } catch (error) {
        data.status = 500;
        data.name = null;
        data.react = null;
    }
    return data
}
const getListNewFriendPerMonth = async (req, res) => {
    const data = { month: null, count: null, status: null }
    try {
        const db = await connectdb();
        const collection = db.collection('list_friend_react');
        const result = await collection.aggregate([
            {
                $group: {
                    _id: { month: { $month: "$time" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.month": 1 }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    count: 1
                }
            }
        ]).toArray();
        for (let i = 0; i < result.length; i++) {
            if (result[i].month == 1) result[i].month = "January"
            if (result[i].month == 2) result[i].month = "February"
            if (result[i].month == 3) result[i].month = "March"
            if (result[i].month == 4) result[i].month = "April"
            if (result[i].month == 5) result[i].month = "May"
            if (result[i].month == 6) result[i].month = "June"
            if (result[i].month == 7) result[i].month = "July"
            if (result[i].month == 8) result[i].month = "August"
            if (result[i].month == 9) result[i].month = "September"
            if (result[i].month == 10) result[i].month = "October"
            if (result[i].month == 11) result[i].month = "November"
            if (result[i].month == 12) result[i].month = "December"
        }
        var month = []
        var count = []
        for (let i = 0; i < result.length; i++) {
            month.push(result[i].month)
            count.push(result[i].count)
        }
        data.month = month
        data.count = count
        data.status = 200
    } catch (error) {
        data.status = 500;
        console.log(error);
    }

    return data
}
module.exports = { getAllData, getListFriendInteraction, getListNewFriendPerMonth }