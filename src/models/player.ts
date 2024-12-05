import * as playerService from '@/services/player';
import type { Player } from '@/types';
import { message } from 'antd';
import type { Effect, ImmerReducer } from 'umi';

export interface PlayerModelState {
  list: Player[];
  currentPlayer: Player | null;
  loading: boolean;
}

export interface PlayerModelType {
  namespace: 'player';
  state: PlayerModelState;
  effects: {
    fetchList: Effect;
    fetchOne: Effect;
    create: Effect;
    update: Effect;
    delete: Effect;
  };
  reducers: {
    saveList: ImmerReducer<PlayerModelState>;
    saveOne: ImmerReducer<PlayerModelState>;
    setLoading: ImmerReducer<PlayerModelState>;
  };
}

const PlayerModel: PlayerModelType = {
  namespace: 'player',
  state: {
    list: [],
    currentPlayer: null,
    loading: false,
  },
  effects: {
    *fetchList(_, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const data = yield call(playerService.getPlayers);
        yield put({ type: 'saveList', payload: data });
      } catch (error) {
        message.error('获取玩家列表失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *fetchOne({ payload: id }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const data = yield call(playerService.getPlayer, id);
        yield put({ type: 'saveOne', payload: data });
      } catch (error) {
        message.error('获取玩家信息失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *create({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        yield call(playerService.createPlayer, payload);
        message.success('创建玩家成功');
        yield put({ type: 'fetchList' });
      } catch (error) {
        message.error('创建玩家失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *update({ payload: { id, data } }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        yield call(playerService.updatePlayer, id, data);
        message.success('更新玩家成功');
        yield put({ type: 'fetchList' });
      } catch (error) {
        message.error('更新玩家失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *delete({ payload: id }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        yield call(playerService.deletePlayer, id);
        message.success('删除玩家成功');
        yield put({ type: 'fetchList' });
      } catch (error) {
        message.error('删除玩家失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
  },
  reducers: {
    saveList(state, { payload }) {
      state.list = payload;
    },
    saveOne(state, { payload }) {
      state.currentPlayer = payload;
    },
    setLoading(state, { payload }) {
      state.loading = payload;
    },
  },
};

export default PlayerModel;
