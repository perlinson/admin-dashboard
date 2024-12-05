import * as resourceConfigService from '@/services/resourceConfig';
import type { ResourceConfig } from '@/types';
import { message } from 'antd';
import type { Effect, ImmerReducer } from 'umi';

export interface ResourceConfigModelState {
  list: ResourceConfig[];
  currentResourceConfig: ResourceConfig | null;
  loading: boolean;
}

export interface ResourceConfigModelType {
  namespace: 'resourceConfig';
  state: ResourceConfigModelState;
  effects: {
    fetchList: Effect;
    fetchOne: Effect;
    create: Effect;
    update: Effect;
    delete: Effect;
    fetchByName: Effect;
  };
  reducers: {
    saveList: ImmerReducer<ResourceConfigModelState>;
    saveOne: ImmerReducer<ResourceConfigModelState>;
    setLoading: ImmerReducer<ResourceConfigModelState>;
  };
}

const ResourceConfigModel: ResourceConfigModelType = {
  namespace: 'resourceConfig',
  state: {
    list: [],
    currentResourceConfig: null,
    loading: false,
  },
  effects: {
    *fetchList(_, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const data = yield call(resourceConfigService.getResourceConfigs);
        yield put({ type: 'saveList', payload: data });
      } catch (error) {
        message.error('获取资源配置列表失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *fetchOne({ payload: id }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const data = yield call(resourceConfigService.getResourceConfig, id);
        yield put({ type: 'saveOne', payload: data });
      } catch (error) {
        message.error('获取资源配置信息失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *create({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        yield call(resourceConfigService.createResourceConfig, payload);
        message.success('创建资源配置成功');
        yield put({ type: 'fetchList' });
      } catch (error) {
        message.error('创建资源配置失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *update({ payload: { id, data } }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        yield call(resourceConfigService.updateResourceConfig, id, data);
        message.success('更新资源配置成功');
        yield put({ type: 'fetchList' });
      } catch (error) {
        message.error('更新资源配置失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *delete({ payload: id }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        yield call(resourceConfigService.deleteResourceConfig, id);
        message.success('删除资源配置成功');
        yield put({ type: 'fetchList' });
      } catch (error) {
        message.error('删除资源配置失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *fetchByName({ payload: name }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const data = yield call(
          resourceConfigService.getResourceConfigByName,
          name,
        );
        yield put({ type: 'saveOne', payload: data });
      } catch (error) {
        message.error('获取资源配置失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
  },
  reducers: {
    saveList(state, { payload }) {
      state.list = payload;
    },
    saveOne(state, { payload }) {
      state.currentResourceConfig = payload;
    },
    setLoading(state, { payload }) {
      state.loading = payload;
    },
  },
};

export default ResourceConfigModel;
