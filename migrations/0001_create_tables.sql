-- This is an empty migration.
-- 玩家表
CREATE TABLE players (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    resources JSON,  -- 存储各类资源数量
    level INTEGER,
    created_at TIMESTAMP
);

-- 建筑表
CREATE TABLE buildings (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,  -- 建筑类型
    requirements JSON,   -- 建造要求
    effects JSON,       -- 建筑效果
    upgrade_costs JSON  -- 升级成本
);

-- 科技表
CREATE TABLE technologies (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    requirements JSON,
    effects JSON,
    research_time INTEGER
);

-- 资源配置表
CREATE TABLE resource_configs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    base_production_rate REAL,
    max_storage INTEGER
);

-- 游戏事件表
CREATE TABLE events (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    conditions JSON,
    effects JSON,
    probability REAL
);