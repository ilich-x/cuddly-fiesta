const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check if there is a current userId
    if (!ctx.request.userId) {
      return null;
    }

    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info,
    );
  },
  async users(parent, args, ctx, info) {
    // check if they are logged in
    if (!ctx.request.userId) {
      return new Error('You must logged in!');
    }
    // check if the user has the permissions to query all the users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSONUPDATE']); // TODO: smth wrong with permissions? error when user dosen't have

    return ctx.db.query.users({}, info);
  },
  async order(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in');
    }
    const order = await ctx.db.query.order(
      {
        where: {
          id: args.id,
        },
      },
      info,
    );
    const ownsOrder = order.user.id === userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes(
      'ADMIN',
    );
    if (!ownsOrder || !hasPermissionToSeeOrder) {
      throw new Error('You cant see this');
    }

    return order;
  },
  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in');
    }
    const orders = await ctx.db.query.orders(
      {
        where: {
          user: { id: userId },
        },
      },
      info,
    );

    return orders;
  },
};

module.exports = Query;
