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

const updateWatchList = async (req, res) => {
    try {
        const { watchlistId } = req.params
        const { title, users, emoji } = req.body

        const userList = await Promise.all(
            users.map((user) =>
                userModel.findById(user._id).select("_id username image")
            )
        )

        const watchList = await watchlistModel.findById(watchlistId)

        watchList.title = title
        watchList.users = userList
        watchList.emoji = emoji

        watchList.save()

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

const addMedia = async (req, res) => {
    try {
        const { media, watchlistId } = req.body

        const watchlist = await watchlistModel.findById(watchlistId)

        watchlist.medias.push(media)

        await watchlist.save()

        responseHandler.ok(res, watchlist._doc)
    } catch {
        responseHandler.error(res)
    }
}

const removeMedia = async (req, res) => {
    try {
        const { media, watchlistId } = req.body

        const watchlist = await watchlistModel.findById(watchlistId)

        watchlist.medias.pull(media)

        await watchlist.save()

        const updatedWatchlist = await watchlistModel.findById(watchlistId)

        responseHandler.ok(res, updatedWatchlist)
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

export default {
    createWatchList,
    deleteWatchList,
    updateWatchList,
    getWatchList,
    getAllWatchList,
    addMedia,
    removeMedia,
}
