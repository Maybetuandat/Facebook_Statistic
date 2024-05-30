
const { getAllData, getListFriendInteraction, getListNewFriendPerMonth } = require("./service")
const statitistic = async (req, res) => {
    const data = await getAllData();
    // console.log(data)
    const data2 = await getListFriendInteraction()
    const data3 = await getListNewFriendPerMonth()
    // console.log(data2)
    // console.log(data3)
    res.render('index',
        {
            data: data,
            data2: data2,
            data3: data3
        });

}
module.exports = statitistic;