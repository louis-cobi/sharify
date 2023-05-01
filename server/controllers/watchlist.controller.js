import responseHandler from "../handlers/response.handler.js"
import watchlistModel from "../models/watchlist.model.js"
import userModel from "../models/user.model.js"

const createWatchList = async (req, res) => {
    try {
        const { title, users, emoji } = req.body

        const userList = await Promise.all(
            users.map((user) =>
                userModel.findById(user._id).select("_id username image")
            )
        )

        const watchList = await watchlistModel.create({
            title: title,
            emoji: emoji,
            users: userList,
        })

        const populatedWatchList = await watchlistModel
            .findById(watchList.id)
            .populate("users", "_id username image")

        responseHandler.created(res, {
            id: populatedWatchList.id,
            ...populatedWatchList._doc,
        })
    } catch {
        responseHandler.error(res)
    }
}

const getWatchList = async (req, res) => {
    try {
        const { watchlistId } = req.params
        const watchLists = await watchlistModel
            .findById(watchlistId)
            .populate("users", "_id username image")

        responseHandler.ok(res, watchLists)
    } catch {
        responseHandler.error(res)
    }
}

const getAllWatchList = async (req, res) => {
    try {
        const { userId } = req.params

        const user = await userModel
            .findById(userId)
            .select("_id username image")
        const watchLists = await watchlistModel
            .find({
                users: { $in: user },
            })
            .populate("users", "_id username image")
            .sort("-createdAt")

        responseHandler.ok(res, watchLists)
    } catch {
        responseHandler.error(res)
    }
}

const addUser = async (req, res) => {
    try {
        const { users, watchList } = req.data
        //const { users, watchList } = req.body;

        const watchListDoc = await watchlistModel.findById(watchList.id)

        if (!watchListDoc) return responseHandler.notfound(res)

        let newUsers = []

        await users.forEach(async (user) => {
            const userId = await userModel
                .findById(user.id)
                .select("_id username displayName")
            if (!userId) return responseHandler.notfound(res)
            newUsers.push(userId)
        })

        const userlist = newUsers.forEach((user) => {
            watchListDoc.users.push(user)
        })

        watchListDoc.users = userlist

        await watchListDoc.save()
        responseHandler.ok(res, watchListDoc)
    } catch {
        responseHandler.error(res)
    }
}

const addMedia = async (req, res) => {
    try {
        const { media, watchlistId } = req.body

        const watchlist = await watchlistModel.findById(watchlistId)

        watchlist.medias.push(media);

        await watchlist.save();

        responseHandler.ok(res, watchlist._doc)
    } catch {
        responseHandler.error(res)
    }
}

const removeUser = async (req, res) => {
    try {
        // cosnt { users, watchList} = req.body
        const watchListId = req.params.watchListId
        const { users } = req.body

        const watchList = await watchlistModel.findById(watchListId)

        if (!watchList) {
            return responseHandler.error(res)
        }

        watchList.users = watchList.users.filter(
            (user) => !users.includes(user)
        )

        await watchList.save()

        responseHandler.ok(res, watchList)
    } catch {
        responseHandler.error(res)
    }
}

const removeMedia = async (req, res) => {
    try {
        // cosnt { users, watchList} = req.body
        const watchListId = req.params.watchListId
        const { medias } = req.body

        const watchList = await watchlistModel.findById(watchListId)

        if (!watchList) {
            return responseHandler.error(res)
        }

        watchList.users = watchList.users.filter(
            (media) => !medias.includes(media)
        )

        await watchList.save()

        responseHandler.ok(res, watchList)
    } catch {
        responseHandler.error(res)
    }
}

const deleteWatchList = async (req, res) => {
    try {
        const { watchListId } = req.params

        const watchList = await watchlistModel.findById(watchListId)
        if (!watchList) {
            return responseHandler.error(res)
        }

        await watchList.delete()
        responseHandler.ok(res)
    } catch {
        responseHandler.error(res)
    }
}

const renameWatchList = async (req, res) => {
    try {
        const { watchListId } = req.params
        const { name } = req.body

        const watchList = await watchlistModel.findById(watchListId)
        if (!watchList) {
            return responseHandler.error(res)
        }

        watchList.title = name
        await watchList.save()
        responseHandler.ok(res, watchList)
    } catch {
        responseHandler.error(res)
    }
}

export default {
    createWatchList,
    getWatchList,
    getAllWatchList,
    addUser,
    addMedia,
    deleteWatchList,
    removeUser,
    removeMedia,
    renameWatchList,
}
