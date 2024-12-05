// 基础类型定义
export interface BaseResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Player 相关类型
export interface Player {
  id: string;
  username: string;
  resources: string; // JSON string
  level: number;
  createdAt: Date;
}

// Building 相关类型
export interface Building {
  id: string;
  name: string;
  type: string;
  requirements: string; // JSON string
  effects: string; // JSON string
  upgradeCosts: string; // JSON string
}

// Technology 相关类型
export interface Technology {
  id: string;
  name: string;
  description?: string;
  requirements: string; // JSON string
  effects: string; // JSON string
  researchTime: number;
}

// ResourceConfig 相关类型
export interface ResourceConfig {
  id: string;
  name: string;
  baseProductionRate: number;
  maxStorage: number;
}

// Event 相关类型
export interface Event {
  id: string;
  name: string;
  conditions: string; // JSON string
  effects: string; // JSON string
  probability: number;
}
