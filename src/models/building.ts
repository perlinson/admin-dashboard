import * as buildingService from '@/services/building';
import type { Building } from '@/types';
import { message } from 'antd';
import type { Effect, ImmerReducer } from 'umi';

export interface BuildingModelState {
  list: Building[];
  currentBuilding: Building | null;
  loading: boolean;
}

export interface BuildingModelType {
  namespace: 'building';
  state: BuildingModelState;
  effects: {
    fetchList: Effect;
    fetchOne: Effect;
    create: Effect;
    update: Effect;
    delete: Effect;
    fetchByType: Effect;
  };
  reducers: {
    saveList: ImmerReducer<BuildingModelState>;
    saveOne: ImmerReducer<BuildingModelState>;
    setLoading: ImmerReducer<BuildingModelState>;
  };
}

const BuildingModel: BuildingModelType = {
  namespace: 'building',
  state: {
    list: [],
    currentBuilding: null,
    loading: false,
  },
  effects: {
    *fetchList(_, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const data = yield call(buildingService.getBuildings);
        yield put({ type: 'saveList', payload: data });
      } catch (error) {
        message.error('获取建筑列表失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *fetchOne({ payload: id }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const data = yield call(buildingService.getBuilding, id);
        yield put({ type: 'saveOne', payload: data });
      } catch (error) {
        message.error('获取建筑信息失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *create({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        yield call(buildingService.createBuilding, payload);
        message.success('创建建筑成功');
        yield put({ type: 'fetchList' });
      } catch (error) {
        message.error('创建建筑失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *update({ payload: { id, data } }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        yield call(buildingService.updateBuilding, id, data);
        message.success('更新建筑成功');
        yield put({ type: 'fetchList' });
      } catch (error) {
        message.error('更新建筑失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *delete({ payload: id }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        yield call(buildingService.deleteBuilding, id);
        message.success('删除建筑成功');
        yield put({ type: 'fetchList' });
      } catch (error) {
        message.error('删除建筑失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *fetchByType({ payload: type }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const data = yield call(buildingService.getBuildingsByType, type);
        yield put({ type: 'saveList', payload: data });
      } catch (error) {
        message.error('获取建筑列表失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
  },
  reducers: {
    saveList(state, { payload }) {
      state.list = payload;
    },
    saveOne(state, { payload }) {
      state.currentBuilding = payload;
    },
    setLoading(state, { payload }) {
      state.loading = payload;
    },
  },
};

export default BuildingModel;
