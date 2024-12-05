-- 初始化玩家数据
INSERT INTO players (id, username, resources, level, created_at) VALUES
('1', 'player1', '{"gold":1000,"wood":500,"food":800}', 1, CURRENT_TIMESTAMP),
('2', 'player2', '{"gold":1500,"wood":700,"food":1000}', 2, CURRENT_TIMESTAMP);

-- 初始化建筑数据
INSERT INTO buildings (id, name, type, requirements, effects, upgrade_costs) VALUES
('1', '木材厂', 'resource', '{"level":1}', '{"wood_production":10}', '{"gold":100,"wood":50}'),
('2', '农场', 'resource', '{"level":1}', '{"food_production":10}', '{"gold":100,"wood":50}'),
('3', '金矿', 'resource', '{"level":1}', '{"gold_production":5}', '{"gold":200,"wood":100}');

-- 初始化科技数据
INSERT INTO technologies (id, name, description, requirements, effects, research_time) VALUES
('1', '高级采集', '提升资源采集效率', '{"building_level":2}', '{"resource_efficiency":1.2}', 3600),
('2', '高级建造', '提升建筑效率', '{"building_level":3}', '{"build_speed":1.2}', 7200);

-- 初始化资源配置数据
INSERT INTO resource_configs (id, name, base_production_rate, max_storage) VALUES
('1', '金币', 1.0, 10000),
('2', '木材', 1.0, 5000),
('3', '食物', 1.0, 5000);

-- 初始化事件数据
INSERT INTO events (id, name, conditions, effects, probability) VALUES
('1', '丰收', '{"season":"summer"}', '{"food_production_bonus":1.5}', 0.3),
('2', '矿脉发现', '{"building_type":"mine"}', '{"gold_production_bonus":2.0}', 0.1);
