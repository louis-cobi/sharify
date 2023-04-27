import responseHandler from "../handlers/response.handler.js";
import watchlistModel from "../models/watchlist.model.js";
import userModel from "../models/user.model.js";

const createWatchList = async (req, res) => {
  try {
    const { title, users } = req.data;
    //const { title, users } = req.body;
    // const { user } = req.user.id

    let userList = [];
    users.forEach((user) => {
      userList.push(
        userModel.findById(user.id).select("_id username displayName")
      ); // or userModel.FindOne({users: { $elemMatch: { user.displayName }} })
    });
    const watchList = new watchlistModel({ title, users: userList });
    await watchList.save();
    responseHandler.created(res, {
      id: watchList.id,
      title: watchList.title,
      users: watchList.users,
    });
  } catch {
    responseHandler.error(res);
  }
};

const getWatchList = async (req, res) => {
  try {
    // const {userId} = req.params or req.body or req.query
    const watchLists = await watchlistModel
      .find({
        users: { $elemMatch: { id: req.user.id }} 
      })
      .sort("-createdAt");

    responseHandler.ok(res, watchLists);
  } catch {
    responseHandler.error(res);
  }
};

const addUsers = async (req, res) => {
  try {
    const { users, watchList } = req.data;
    //const { users, watchList } = req.body;

    const watchListDoc = await watchlistModel.findById(watchList.id);

    if (!watchListDoc) return responseHandler.notfound(res);

    let newUsers = [];

    await users.forEach(async (user) => {
      const userId = await userModel
        .findById(user.id)
        .select("_id username displayName");
      if (!userId) return responseHandler.notfound(res);
      newUsers.push(userId);
    });

    const userlist = newUsers.forEach((user) => {
      watchListDoc.users.push(user);
    });

    watchListDoc.users = userlist;

    await watchListDoc.save();
    responseHandler.ok(res, watchListDoc);
  } catch {
    responseHandler.error(res);
  }
};

const addMedias = async (req, res) => {
  try {
    //const { medias, watchList } = req.body
    const { medias, watchList } = req.data;

    const watchListDoc = await watchlistModel.findById(watchList.id);

    if (!watchListDoc) return responseHandler.notfound(res);

    medias.forEach((media) => {
      watchListDoc.medias.push(media);
    });

    await watchListDoc.save();
    responseHandler.ok(res, watchListDoc);
  } catch {
    responseHandler.error(res);
  }
};

const removeUsers = async (req, res) => {
  try {
    // cosnt { users, watchList} = req.body
    const watchListId = req.params.watchListId;
    const { users } = req.body;

    const watchList = await watchlistModel.findById(watchListId);

    if (!watchList) {
      return responseHandler.error(res);
    }

    watchList.users = watchList.users.filter((user) => !users.includes(user));

    await watchList.save();

    responseHandler.ok(res, watchList);
  } catch {
    responseHandler.error(res);
  }
};

const removeMedias = async (req, res) => {
  try {
    // cosnt { users, watchList} = req.body
    const watchListId = req.params.watchListId;
    const { medias } = req.body;

    const watchList = await watchlistModel.findById(watchListId);

    if (!watchList) {
      return responseHandler.error(res);
    }

    watchList.users = watchList.users.filter(
      (media) => !medias.includes(media)
    );

    await watchList.save();

    responseHandler.ok(res, watchList);
  } catch {
    responseHandler.error(res);
  }
};

const deleteWatchList = async (req, res) => {
  try {
    const { watchListId } = req.params;

    const watchList = await watchlistModel.findById(watchListId);
    if (!watchList) {
      return responseHandler.error(res);
    }

    await watchList.delete();
    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const renameWatchList = async (req, res) => {
  try {
    const { watchListId } = req.params;
    const { name } = req.body;

    const watchList = await watchlistModel.findById(watchListId);
    if (!watchList) {
      return responseHandler.error(res);
    }

    watchList.title = name;
    await watchList.save();
    responseHandler.ok(res, watchList);
  } catch {
    responseHandler.error(res);
  }
};

const colorWatchList = async (req, res) => {
  try {
    const { watchListId } = req.params;
    const { color } = req.body;

    const watchList = await watchlistModel.findById(watchListId);
    if (!watchList) {
      return responseHandler.error(res);
    }

    watchList.color = color;
    await watchList.save();
    responseHandler.ok(res, watchList);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  createWatchList,
  getWatchList,
  addUsers,
  addMedias,
  deleteWatchList,
  removeUsers,
  removeMedias,
  renameWatchList,
  colorWatchList,
};
