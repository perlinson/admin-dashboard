import * as technologyService from '@/services/technology';
import type { Technology } from '@/types';
import { message } from 'antd';
import type { Effect, ImmerReducer } from 'umi';

export interface TechnologyModelState {
  list: Technology[];
  currentTechnology: Technology | null;
  loading: boolean;
}

export interface TechnologyModelType {
  namespace: 'technology';
  state: TechnologyModelState;
  effects: {
    fetchList: Effect;
    fetchOne: Effect;
    create: Effect;
    update: Effect;
    delete: Effect;
    fetchByResearchTime: Effect;
  };
  reducers: {
    saveList: ImmerReducer<TechnologyModelState>;
    saveOne: ImmerReducer<TechnologyModelState>;
    setLoading: ImmerReducer<TechnologyModelState>;
  };
}

const TechnologyModel: TechnologyModelType = {
  namespace: 'technology',
  state: {
    list: [],
    currentTechnology: null,
    loading: false,
  },
  effects: {
    *fetchList(_, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const data = yield call(technologyService.getTechnologies);
        yield put({ type: 'saveList', payload: data });
      } catch (error) {
        message.error('获取科技列表失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *fetchOne({ payload: id }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const data = yield call(technologyService.getTechnology, id);
        yield put({ type: 'saveOne', payload: data });
      } catch (error) {
        message.error('获取科技信息失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *create({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        yield call(technologyService.createTechnology, payload);
        message.success('创建科技成功');
        yield put({ type: 'fetchList' });
      } catch (error) {
        message.error('创建科技失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *update({ payload: { id, data } }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        yield call(technologyService.updateTechnology, id, data);
        message.success('更新科技成功');
        yield put({ type: 'fetchList' });
      } catch (error) {
        message.error('更新科技失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *delete({ payload: id }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        yield call(technologyService.deleteTechnology, id);
        message.success('删除科技成功');
        yield put({ type: 'fetchList' });
      } catch (error) {
        message.error('删除科技失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *fetchByResearchTime({ payload: maxTime }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const data = yield call(
          technologyService.getTechnologiesByResearchTime,
          maxTime,
        );
        yield put({ type: 'saveList', payload: data });
      } catch (error) {
        message.error('获取科技列表失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
  },
  reducers: {
    saveList(state, { payload }) {
      state.list = payload;
    },
    saveOne(state, { payload }) {
      state.currentTechnology = payload;
    },
    setLoading(state, { payload }) {
      state.loading = payload;
    },
  },
};

export default TechnologyModel;
