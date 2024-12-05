import * as eventService from '@/services/event';
import type { Event } from '@/types';
import { message } from 'antd';
import type { Effect, ImmerReducer } from 'umi';

export interface EventModelState {
  list: Event[];
  currentEvent: Event | null;
  loading: boolean;
}

export interface EventModelType {
  namespace: 'event';
  state: EventModelState;
  effects: {
    fetchList: Effect;
    fetchOne: Effect;
    create: Effect;
    update: Effect;
    delete: Effect;
    fetchByProbability: Effect;
  };
  reducers: {
    saveList: ImmerReducer<EventModelState>;
    saveOne: ImmerReducer<EventModelState>;
    setLoading: ImmerReducer<EventModelState>;
  };
}

const EventModel: EventModelType = {
  namespace: 'event',
  state: {
    list: [],
    currentEvent: null,
    loading: false,
  },
  effects: {
    *fetchList(_, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const data = yield call(eventService.getEvents);
        yield put({ type: 'saveList', payload: data });
      } catch (error) {
        message.error('获取事件列表失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *fetchOne({ payload: id }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const data = yield call(eventService.getEvent, id);
        yield put({ type: 'saveOne', payload: data });
      } catch (error) {
        message.error('获取事件信息失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *create({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        yield call(eventService.createEvent, payload);
        message.success('创建事件成功');
        yield put({ type: 'fetchList' });
      } catch (error) {
        message.error('创建事件失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *update({ payload: { id, data } }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        yield call(eventService.updateEvent, id, data);
        message.success('更新事件成功');
        yield put({ type: 'fetchList' });
      } catch (error) {
        message.error('更新事件失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *delete({ payload: id }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        yield call(eventService.deleteEvent, id);
        message.success('删除事件成功');
        yield put({ type: 'fetchList' });
      } catch (error) {
        message.error('删除事件失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *fetchByProbability({ payload: minProbability }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const data = yield call(
          eventService.getEventsByProbability,
          minProbability,
        );
        yield put({ type: 'saveList', payload: data });
      } catch (error) {
        message.error('获取事件列表失败');
      }
      yield put({ type: 'setLoading', payload: false });
    },
  },
  reducers: {
    saveList(state, { payload }) {
      state.list = payload;
    },
    saveOne(state, { payload }) {
      state.currentEvent = payload;
    },
    setLoading(state, { payload }) {
      state.loading = payload;
    },
  },
};

export default EventModel;
