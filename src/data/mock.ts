// 启德考培 · 教学主管看板演示数据（雅思考培场景）

export interface Teacher {
  id: string;
  name: string;
  city: string; // 城市
  site: string; // 具体校区
  classes: string[];
  students: number;
  hours: number; // 近30天课量（课时）
  assignments: number; // 布置作业次数
  gradeRate: number; // 批改完成率 %
  gradeTime: number; // 批改时效（小时）
  feedbackDone: number; // 授课反馈已提交
  feedbackTotal: number;
  avgImprove: number; // 学生平均提分
  aiCoverage: number; // 反馈有效解析率 %
  correctionRate: number; // 教师修正率 %
  timelyRate: number; // 反馈提交及时率 %
}

export interface AssignmentDetail {
  title: string;
  className: string;
  submitted: string;
  graded: string;
  avg?: string;
}

export interface FeedbackRecord {
  title: string;
  className: string;
  date: string;
  status: '已发布' | '待审核';
}

export interface StudentOutcome {
  name: string;
  change: string;
  to: number;
}

export interface RiskCategory {
  reason: string; // 风险原因
  count: number;
  color: string;
  students: RiskStudent[];
}

export interface RiskStudent {
  name: string;
  city: string;
  site: string;
  className: string;
  teacher: string;
  level: '高' | '中' | '低';
  days: number; // 距最近反馈天数
  summary: string;
  reasons: string[]; // 风险原因（直观描述）
}

export interface ProgressStar {
  name: string;
  city: string;
  site: string;
  className: string;
  teacher: string;
  progressCount: number; // 进步表现次数
  trajectory: number[]; // 模考总分轨迹
  highlight: string;
}

// 学生详细档案
export interface StudentProfile {
  studentId: string;
  enrollDate: string;
  stage: string; // 阶段
  targetScore: number;
  current: { L: number; R: number; W: number; S: number; total: number };
  attendance: number; // %
  weakPoints: string[]; // 薄弱环节
  feedbacks: { date: string; teacher: string; text: string }[];
  followUps: { date: string; by: string; text: string }[];
}

// 城市 → 校区
export const cities = ['全部城市', '北京', '上海', '深圳', '合肥', '成都', '天津', '青岛'];
export const citySites: Record<string, string[]> = {
  北京: ['国贸校区', '望京校区', '中关村校区'],
  上海: ['徐汇校区', '浦东校区'],
  深圳: ['南山校区', '福田校区'],
  合肥: ['政务校区'],
  成都: ['锦江校区'],
  天津: ['和平校区'],
  青岛: ['市南校区'],
};

export const teachers: Teacher[] = [
  { id: 't1', name: '张萌', city: '北京', site: '国贸校区', classes: ['雅思强化A班', '雅思冲刺C班'], students: 20, hours: 42, assignments: 26, gradeRate: 92, gradeTime: 18, feedbackDone: 40, feedbackTotal: 42, avgImprove: 0.9, aiCoverage: 96, correctionRate: 8, timelyRate: 95 },
  { id: 't2', name: '王雅静', city: '北京', site: '望京校区', classes: ['雅思基础B班'], students: 10, hours: 20, assignments: 14, gradeRate: 96, gradeTime: 12, feedbackDone: 20, feedbackTotal: 20, avgImprove: 0.7, aiCoverage: 93, correctionRate: 5, timelyRate: 100 },
  { id: 't9', name: '孙立群', city: '北京', site: '中关村校区', classes: ['雅思阅读专项班'], students: 14, hours: 26, assignments: 16, gradeRate: 89, gradeTime: 20, feedbackDone: 24, feedbackTotal: 26, avgImprove: 0.6, aiCoverage: 88, correctionRate: 10, timelyRate: 92 },
  { id: 't3', name: '陈默', city: '上海', site: '徐汇校区', classes: ['雅思强化D班'], students: 11, hours: 24, assignments: 12, gradeRate: 74, gradeTime: 36, feedbackDone: 19, feedbackTotal: 24, avgImprove: 0.3, aiCoverage: 68, correctionRate: 22, timelyRate: 79 },
  { id: 't10', name: '林晓丹', city: '上海', site: '浦东校区', classes: ['雅思基础C班'], students: 13, hours: 24, assignments: 15, gradeRate: 91, gradeTime: 15, feedbackDone: 23, feedbackTotal: 24, avgImprove: 0.6, aiCoverage: 92, correctionRate: 6, timelyRate: 96 },
  { id: 't4', name: '李思远', city: '深圳', site: '南山校区', classes: ['雅思冲刺A班', '口语专项班'], students: 16, hours: 36, assignments: 22, gradeRate: 88, gradeTime: 20, feedbackDone: 33, feedbackTotal: 36, avgImprove: 0.8, aiCoverage: 91, correctionRate: 11, timelyRate: 92 },
  { id: 't11', name: '黄志文', city: '深圳', site: '福田校区', classes: ['雅思强化C班'], students: 15, hours: 30, assignments: 18, gradeRate: 87, gradeTime: 22, feedbackDone: 27, feedbackTotal: 30, avgImprove: 0.7, aiCoverage: 86, correctionRate: 12, timelyRate: 90 },
  { id: 't5', name: '周凯文', city: '合肥', site: '政务校区', classes: ['雅思基础A班'], students: 12, hours: 22, assignments: 15, gradeRate: 90, gradeTime: 16, feedbackDone: 21, feedbackTotal: 22, avgImprove: 0.6, aiCoverage: 89, correctionRate: 9, timelyRate: 95 },
  { id: 't6', name: '吴倩', city: '成都', site: '锦江校区', classes: ['雅思强化B班', '写作单项班'], students: 18, hours: 38, assignments: 24, gradeRate: 85, gradeTime: 24, feedbackDone: 34, feedbackTotal: 38, avgImprove: 0.7, aiCoverage: 87, correctionRate: 13, timelyRate: 89 },
  { id: 't7', name: '郑海峰', city: '天津', site: '和平校区', classes: ['雅思预备段班'], students: 9, hours: 18, assignments: 10, gradeRate: 93, gradeTime: 14, feedbackDone: 17, feedbackTotal: 18, avgImprove: 0.5, aiCoverage: 90, correctionRate: 7, timelyRate: 94 },
  { id: 't8', name: '赵梦琪', city: '青岛', site: '市南校区', classes: ['雅思口语专项班'], students: 8, hours: 16, assignments: 9, gradeRate: 81, gradeTime: 28, feedbackDone: 13, feedbackTotal: 16, avgImprove: 0.4, aiCoverage: 76, correctionRate: 18, timelyRate: 81 },
];

export const assignmentDetails: Record<string, AssignmentDetail[]> = {
  t1: [
    { title: '大作文：科技类话题（雅托邦·9分真题库 卷12）', className: '雅思强化A班', submitted: '9/12', graded: '5/9', avg: '6.2' },
    { title: '口语 Part2：Describe a person who inspired you', className: '雅思强化A班', submitted: '6/12', graded: '0/6' },
    { title: '听力：选择题精听（剑雅20 Test1 Section3）', className: '雅思冲刺C班', submitted: '3/8', graded: '3/3', avg: '85' },
  ],
  t2: [
    { title: '小作文：动态图表（柱图+线图混合）', className: '雅思基础B班', submitted: '8/10', graded: '8/8', avg: '5.8' },
    { title: '阅读：判断题专项（剑雅19 Test2）', className: '雅思基础B班', submitted: '10/10', graded: '10/10', avg: '78' },
  ],
  t3: [
    { title: '大作文：教育类话题（双边讨论）', className: '雅思强化D班', submitted: '7/11', graded: '4/7', avg: '5.9' },
    { title: '听力：地图题专项训练', className: '雅思强化D班', submitted: '5/11', graded: '5/5' },
  ],
};

export const feedbackRecords: Record<string, FeedbackRecord[]> = {
  t1: [
    { title: '第18讲 · 写作', className: '雅思强化A班', date: '2026-07-22', status: '已发布' },
    { title: '第19讲 · 口语', className: '雅思强化A班', date: '2026-07-23', status: '待审核' },
    { title: '第12讲 · 听力', className: '雅思冲刺C班', date: '2026-07-24', status: '已发布' },
  ],
  t2: [
    { title: '第9讲 · 写作', className: '雅思基础B班', date: '2026-07-21', status: '已发布' },
    { title: '第10讲 · 阅读', className: '雅思基础B班', date: '2026-07-24', status: '已发布' },
  ],
  t3: [
    { title: '第15讲 · 写作', className: '雅思强化D班', date: '2026-07-19', status: '已发布' },
    { title: '第16讲 · 听力', className: '雅思强化D班', date: '2026-07-23', status: '待审核' },
  ],
};

export const studentOutcomes: Record<string, StudentOutcome[]> = {
  t1: [
    { name: '张可欣', change: '入学至今 6.0 → 7.0', to: 7.0 },
    { name: '李昊然', change: '入学至今 5.5 → 6.5', to: 6.5 },
    { name: '王思远', change: '入学至今 5.5 → 6.0', to: 6.0 },
    { name: '赵梓萱', change: '入学至今 6.5 → 7.0', to: 7.0 },
  ],
  t2: [
    { name: '刘子墨', change: '入学至今 5.0 → 5.5', to: 5.5 },
    { name: '陈雨桐', change: '入学至今 4.5 → 5.5', to: 5.5 },
  ],
  t3: [
    { name: '孙一鸣', change: '入学至今 6.0 → 6.0', to: 6.0 },
    { name: '周晓彤', change: '入学至今 5.5 → 6.0', to: 6.0 },
  ],
};

// 学生档案（按姓名索引）
const P = (p: StudentProfile) => p;
export const studentProfiles: Record<string, StudentProfile> = {
  王梓豪: P({ studentId: 'IELTS-2025-114', enrollDate: '2026-03-10', stage: '强化段', targetScore: 6.5, current: { L: 6.0, R: 6.0, W: 5.5, S: 5.5, total: 6.0 }, attendance: 68, weakPoints: ['地图方位词反应', '长难句解析', '课堂参与度'], feedbacks: [
    { date: '2026-07-18', teacher: '陈默', text: '连续两次课未到，班主任联系后回复消极；之前课堂上地图题正确率明显偏低。' },
    { date: '2026-07-09', teacher: '陈默', text: '听力课情绪不高，小组练习不配合，作业未交。' },
  ], followUps: [
    { date: '2026-07-25', by: '班主任 刘芳', text: '电话联系家长，家长表示孩子近期抵触情绪强，询问退费政策，已安抚并约面谈。' },
  ] }),
  刘志强: P({ studentId: 'IELTS-2024-006', enrollDate: '2025-11-02', stage: '预备段 Starter', targetScore: 6.0, current: { L: 5.0, R: 5.5, W: 5.0, S: 5.0, total: 5.0 }, attendance: 70, weakPoints: ['速记笔记能力', '词汇量不足', '学习动力'], feedbacks: [
    { date: '2026-07-22', teacher: '张萌', text: '近两周缺课3次，作业连续未交，课上精神状态一般。' },
    { date: '2026-07-08', teacher: '张萌', text: '听力速记跟不上，笔记零散，建议课后补基础词汇。' },
  ], followUps: [
    { date: '2026-07-24', by: '班主任 王倩', text: '已约家长本周六到校面谈，了解家庭端情况。' },
  ] }),
  孙悦: P({ studentId: 'IELTS-2025-087', enrollDate: '2026-02-18', stage: '冲刺段', targetScore: 7.0, current: { L: 6.5, R: 6.5, W: 6.0, S: 6.0, total: 6.5 }, attendance: 85, weakPoints: ['备考心态', '观点延展论证'], feedbacks: [
    { date: '2026-07-24', teacher: '张萌', text: '课堂参与度骤降，自述"考不出来就算了"，模考写作没写完。' },
    { date: '2026-07-15', teacher: '张萌', text: 'Task2 论证展开有进步，但对分数预期焦虑明显。' },
  ], followUps: [
    { date: '2026-07-26', by: '教学主管 万佳宁', text: '已介入：安排心理辅导沟通一次，并调整其模考频率为两周一次。' },
  ] }),
  吴思颖: P({ studentId: 'IELTS-2025-121', enrollDate: '2026-04-01', stage: '强化段', targetScore: 6.5, current: { L: 5.5, R: 5.0, W: 5.5, S: 6.0, total: 5.5 }, attendance: 92, weakPoints: ['长难句解析', '信息整合推理'], feedbacks: [
    { date: '2026-07-19', teacher: '陈默', text: '阅读长难句仍然吃力，段落结构分析需加强，进度落后班均约20%。' },
  ], followUps: [
    { date: '2026-07-26', by: '教学主管 万佳宁', text: '该生已9天无新反馈，已提醒陈默老师本周内补交课堂反馈。' },
  ] }),
  李思彤: P({ studentId: 'IELTS-2025-143', enrollDate: '2026-05-12', stage: '基础段', targetScore: 6.0, current: { L: 5.5, R: 5.0, W: 5.0, S: 5.5, total: 5.5 }, attendance: 78, weakPoints: ['多任务注意力', '学术词汇量'], feedbacks: [
    { date: '2026-07-23', teacher: '周凯文', text: '本月缺课2次，课上注意力分散，听写正确率下降。' },
  ], followUps: [
    { date: '2026-07-25', by: '班主任 李敏', text: '已约谈：学生表示兼职占用时间，承诺7月底前调整。' },
  ] }),
  陈俊宇: P({ studentId: 'IELTS-2025-098', enrollDate: '2026-03-22', stage: '口语专项', targetScore: 6.5, current: { L: 6.0, R: 6.5, W: 6.0, S: 5.5, total: 6.0 }, attendance: 75, weakPoints: ['语流停顿', '互动回应度'], feedbacks: [
    { date: '2026-07-20', teacher: '赵梦琪', text: '口语课缺勤2次且未约补课，课上对话练习回避眼神交流。' },
  ], followUps: [] }),
  何雨辰: P({ studentId: 'IELTS-2025-076', enrollDate: '2026-01-15', stage: '冲刺段', targetScore: 7.0, current: { L: 6.5, R: 7.0, W: 6.0, S: 6.5, total: 6.5 }, attendance: 90, weakPoints: ['课后练习完成质量'], feedbacks: [
    { date: '2026-07-21', teacher: '李思远', text: '课后练习质量下滑，小组讨论几乎不发言，已单独沟通。' },
  ], followUps: [
    { date: '2026-07-22', by: '李思远', text: '学生反映实习压力大，已将作业量临时减半，观察两周。' },
  ] }),
  赵一诺: P({ studentId: 'IELTS-2025-102', enrollDate: '2026-03-05', stage: '强化段', targetScore: 6.5, current: { L: 6.0, R: 6.0, W: 5.5, S: 6.0, total: 6.0 }, attendance: 88, weakPoints: ['标点拼写'], feedbacks: [
    { date: '2026-07-25', teacher: '吴倩', text: '缺课1次已补齐，本周作文订正认真，状态回升。' },
  ], followUps: [] }),
  高子轩: P({ studentId: 'IELTS-2025-156', enrollDate: '2026-06-01', stage: '预备段', targetScore: 5.5, current: { L: 4.5, R: 5.0, W: 4.5, S: 5.0, total: 4.5 }, attendance: 95, weakPoints: ['作业订正效率'], feedbacks: [
    { date: '2026-07-23', teacher: '郑海峰', text: '作业订正效率下降，但课堂互动尚可，基础词汇在补。' },
  ], followUps: [] }),
  郑好: P({ studentId: 'IELTS-2025-134', enrollDate: '2026-04-20', stage: '基础段', targetScore: 6.0, current: { L: 5.5, R: 4.5, W: 5.0, S: 5.5, total: 5.0 }, attendance: 93, weakPoints: ['学术词汇量', '细节定位筛查'], feedbacks: [
    { date: '2026-07-22', teacher: '王雅静', text: '词汇量低于阶段要求，阅读细节定位慢，已布置每日词汇打卡。' },
  ], followUps: [] }),
  冯天翊: P({ studentId: 'IELTS-2025-089', enrollDate: '2026-02-25', stage: '写作单项', targetScore: 6.5, current: { L: 6.5, R: 6.5, W: 5.5, S: 6.5, total: 6.5 }, attendance: 96, weakPoints: ['扣题度', '观点延展论证'], feedbacks: [
    { date: '2026-07-24', teacher: '吴倩', text: 'Task2 有跑题倾向，论证展开不充分，连续两篇低于5.5，已安排审题专项训练。' },
  ], followUps: [] }),
  徐浩然: P({ studentId: 'IELTS-2025-147', enrollDate: '2026-05-08', stage: '基础段', targetScore: 6.0, current: { L: 5.5, R: 5.5, W: 5.0, S: 5.0, total: 5.5 }, attendance: 91, weakPoints: ['数字日期抓取'], feedbacks: [
    { date: '2026-07-21', teacher: '周凯文', text: '听力分数波动（5.5→6.0→5.5），数字日期考点不稳定，建议精听专项。' },
  ], followUps: [] }),
  杨紫涵: P({ studentId: 'IELTS-2024-015', enrollDate: '2025-12-08', stage: '强化段', targetScore: 7.0, current: { L: 6.5, R: 7.0, W: 5.5, S: 6.5, total: 6.5 }, attendance: 97, weakPoints: ['句式复杂度', '标点拼写'], feedbacks: [
    { date: '2026-07-23', teacher: '张萌', text: '大作文连续两篇未达6.0，句式单一、拼写错误偏多，已批改面批一次。' },
  ], followUps: [] }),
  朱奕辰: P({ studentId: 'IELTS-2025-161', enrollDate: '2026-06-10', stage: '预备段', targetScore: 5.5, current: { L: 5.0, R: 5.0, W: 4.5, S: 5.0, total: 5.0 }, attendance: 89, weakPoints: ['笔记完整性', '订正习惯'], feedbacks: [
    { date: '2026-07-20', teacher: '郑海峰', text: '作业完成率尚可但订正率低，笔记不完整，已与家长沟通督促。' },
  ], followUps: [] }),
  唐欣怡: P({ studentId: 'IELTS-2025-108', enrollDate: '2026-03-28', stage: '口语专项', targetScore: 6.0, current: { L: 5.5, R: 6.0, W: 5.5, S: 5.0, total: 5.5 }, attendance: 86, weakPoints: ['互动回应度', '流利度'], feedbacks: [
    { date: '2026-07-22', teacher: '赵梦琪', text: '口语互评环节不配合，回应简短，已调整为一对一口语陪练过渡。' },
  ], followUps: [] }),
  林可儿: P({ studentId: 'IELTS-2025-071', enrollDate: '2026-01-20', stage: '冲刺段', targetScore: 7.0, current: { L: 6.5, R: 6.5, W: 6.5, S: 6.5, total: 6.5 }, attendance: 94, weakPoints: ['判断题逻辑辨析'], feedbacks: [
    { date: '2026-07-25', teacher: '李思远', text: '标题段落匹配正确率提升至85%，判断题仍有波动，总分6.5站稳。' },
  ], followUps: [] }),
  张可欣: P({ studentId: 'IELTS-2024-011', enrollDate: '2025-10-15', stage: '强化段', targetScore: 7.0, current: { L: 7.5, R: 7.5, W: 6.5, S: 7.0, total: 7.0 }, attendance: 98, weakPoints: ['句式复杂度'], feedbacks: [
    { date: '2026-07-24', teacher: '张萌', text: 'Task2 稳定6.5+，论证充分性显著提升，可以开始冲刺7.5写作训练。' },
  ], followUps: [] }),
  赵梓萱: P({ studentId: 'IELTS-2024-019', enrollDate: '2025-11-20', stage: '冲刺段', targetScore: 7.5, current: { L: 7.5, R: 7.0, W: 6.5, S: 7.0, total: 7.0 }, attendance: 96, weakPoints: ['写作 Task1 数据选取'], feedbacks: [
    { date: '2026-07-23', teacher: '张萌', text: '听力同义替换反应很快，信号词定位准确，模考听力8.0。' },
  ], followUps: [] }),
  李昊然: P({ studentId: 'IELTS-2024-023', enrollDate: '2025-12-01', stage: '强化段', targetScore: 6.5, current: { L: 6.5, R: 6.5, W: 6.0, S: 6.5, total: 6.5 }, attendance: 95, weakPoints: ['词汇丰富度'], feedbacks: [
    { date: '2026-07-22', teacher: '张萌', text: '口语流利度提升明显，停顿减少，模考口语6.5达标。' },
  ], followUps: [] }),
  陈雨桐: P({ studentId: 'IELTS-2025-041', enrollDate: '2026-01-08', stage: '基础段', targetScore: 6.0, current: { L: 5.5, R: 5.5, W: 5.0, S: 5.5, total: 5.5 }, attendance: 99, weakPoints: ['长难句解析'], feedbacks: [
    { date: '2026-07-24', teacher: '王雅静', text: '词汇打卡坚持30天，阅读细节定位明显提速，学习态度非常好。' },
  ], followUps: [] }),
  周晓彤: P({ studentId: 'IELTS-2025-118', enrollDate: '2026-04-05', stage: '强化段', targetScore: 6.5, current: { L: 6.0, R: 6.0, W: 6.0, S: 5.5, total: 6.0 }, attendance: 93, weakPoints: ['流利度'], feedbacks: [
    { date: '2026-07-21', teacher: '陈默', text: '写作逻辑链延展有改善，连贯衔接进步，段落结构更清晰。' },
  ], followUps: [] }),
};

// 全校风险雷达：风险原因分布（可下钻）
export const riskCategories: RiskCategory[] = [
  {
    reason: '频繁缺课', count: 9, color: '#dc2626',
    students: [
      { name: '刘志强', city: '北京', site: '国贸校区', className: '雅思强化A班', teacher: '张萌', level: '高', days: 5, summary: '近两周缺课3次，家长反馈备考动力下降，作业连续未交。', reasons: ['频繁缺课', '连续缺课'] },
      { name: '王梓豪', city: '上海', site: '徐汇校区', className: '雅思强化D班', teacher: '陈默', level: '高', days: 9, summary: '连续两次课未到，班主任联系后回复消极，模考缺席。', reasons: ['频繁缺课', '师生配合度差'] },
      { name: '李思彤', city: '合肥', site: '政务校区', className: '雅思基础A班', teacher: '周凯文', level: '中', days: 4, summary: '本月缺课2次，课上注意力分散，听写正确率下降。', reasons: ['频繁缺课'] },
      { name: '陈俊宇', city: '青岛', site: '市南校区', className: '雅思口语专项班', teacher: '赵梦琪', level: '中', days: 7, summary: '口语课缺勤2次，对话练习回避，流利度下降。', reasons: ['频繁缺课'] },
      { name: '赵一诺', city: '成都', site: '锦江校区', className: '雅思强化B班', teacher: '吴倩', level: '低', days: 2, summary: '上周缺课1次已补课，作业补交及时，持续观察。', reasons: ['偶发缺课'] },
    ],
  },
  {
    reason: '学习动力不足', count: 7, color: '#ea580c',
    students: [
      { name: '孙悦', city: '北京', site: '国贸校区', className: '雅思冲刺C班', teacher: '张萌', level: '高', days: 3, summary: '课堂参与度持续走低，明确表示"考不出来就算了"，家长有退费意向。', reasons: ['学习动力不足', '备考心态焦虑'] },
      { name: '何雨辰', city: '深圳', site: '南山校区', className: '雅思冲刺A班', teacher: '李思远', level: '中', days: 6, summary: '课后练习完成质量下滑，小组讨论几乎不发言。', reasons: ['学习动力不足', '课堂参与度低'] },
      { name: '高子轩', city: '天津', site: '和平校区', className: '雅思预备段班', teacher: '郑海峰', level: '低', days: 4, summary: '近期作业订正效率下降，但课堂互动尚可。', reasons: ['订正效率低'] },
    ],
  },
  {
    reason: '进度严重滞后', count: 6, color: '#d97706',
    students: [
      { name: '吴思颖', city: '上海', site: '徐汇校区', className: '雅思强化D班', teacher: '陈默', level: '高', days: 8, summary: '阶段进度落后班均20%，长难句解析与推理题持续失分。', reasons: ['进度严重滞后', '长难句解析弱'] },
      { name: '郑好', city: '北京', site: '望京校区', className: '雅思基础B班', teacher: '王雅静', level: '中', days: 5, summary: '词汇量低于阶段要求，阅读细节定位慢。', reasons: ['进度严重滞后', '词汇量不足'] },
      { name: '冯天翊', city: '成都', site: '锦江校区', className: '写作单项班', teacher: '吴倩', level: '中', days: 3, summary: 'Task2 有跑题倾向，论证展开连续低于5.5。', reasons: ['扣题度不足', '论证不充分'] },
    ],
  },
  {
    reason: '模考成绩波动', count: 5, color: '#ca8a04',
    students: [
      { name: '林可儿', city: '深圳', site: '南山校区', className: '雅思冲刺A班', teacher: '李思远', level: '中', days: 2, summary: '近三次模考总分 6.5→6.0→6.5 波动，判断题失分集中。', reasons: ['模考成绩波动'] },
      { name: '徐浩然', city: '合肥', site: '政务校区', className: '雅思基础A班', teacher: '周凯文', level: '低', days: 6, summary: '听力分数 5.5→6.0→5.5，数字日期考点不稳定。', reasons: ['模考成绩波动'] },
    ],
  },
  {
    reason: '作业质量下滑', count: 4, color: '#65a30d',
    students: [
      { name: '杨紫涵', city: '北京', site: '国贸校区', className: '雅思强化A班', teacher: '张萌', level: '中', days: 4, summary: '大作文连续两篇未达6.0，句式单一、拼写错误偏多。', reasons: ['作业质量下滑', '句式复杂度弱'] },
      { name: '朱奕辰', city: '天津', site: '和平校区', className: '雅思预备段班', teacher: '郑海峰', level: '低', days: 7, summary: '作业完成率尚可但订正率低，笔记不完整。', reasons: ['订正率低'] },
    ],
  },
  {
    reason: '师生配合度差', count: 3, color: '#0d9488',
    students: [
      { name: '王梓豪', city: '上海', site: '徐汇校区', className: '雅思强化D班', teacher: '陈默', level: '高', days: 9, summary: '对教师反馈基本不回应，家长对教学安排有异议，建议主管介入沟通。', reasons: ['师生配合度差'] },
      { name: '唐欣怡', city: '青岛', site: '市南校区', className: '雅思口语专项班', teacher: '赵梦琪', level: '中', days: 5, summary: '口语互评环节不配合，回应简短。', reasons: ['课堂配合度低'] },
    ],
  },
];

// 退费预警名单（按风险等级排序）
export const refundWarnings: RiskStudent[] = [
  { name: '王梓豪', city: '上海', site: '徐汇校区', className: '雅思强化D班', teacher: '陈默', level: '高', days: 9, summary: '连续两次课未到，对教师反馈不回应，家长已电话询问退费政策。', reasons: ['频繁缺课', '师生配合度差'] },
  { name: '刘志强', city: '北京', site: '国贸校区', className: '雅思强化A班', teacher: '张萌', level: '高', days: 5, summary: '近两周缺课3次，作业连续未交，学习动力明显下降。', reasons: ['频繁缺课', '学习动力不足'] },
  { name: '孙悦', city: '北京', site: '国贸校区', className: '雅思冲刺C班', teacher: '张萌', level: '高', days: 3, summary: '课堂参与度骤降，自述备考信心崩塌，家长在群内表达不满。', reasons: ['学习动力不足', '备考心态焦虑'] },
  { name: '吴思颖', city: '上海', site: '徐汇校区', className: '雅思强化D班', teacher: '陈默', level: '中', days: 8, summary: '阶段进度落后班均20%，已9天未收到教师反馈，需督促教师提交。', reasons: ['进度严重滞后'] },
  { name: '李思彤', city: '合肥', site: '政务校区', className: '雅思基础A班', teacher: '周凯文', level: '中', days: 4, summary: '本月缺课2次，已安排班主任约谈，暂无明确退费信号。', reasons: ['频繁缺课'] },
  { name: '陈俊宇', city: '青岛', site: '市南校区', className: '雅思口语专项班', teacher: '赵梦琪', level: '中', days: 7, summary: '口语课缺勤2次且未约补课，课堂互动持续走低。', reasons: ['频繁缺课', '互动回应度低'] },
  { name: '何雨辰', city: '深圳', site: '南山校区', className: '雅思冲刺A班', teacher: '李思远', level: '低', days: 6, summary: '课后练习质量下滑，教师已介入辅导，持续观察中。', reasons: ['学习动力不足'] },
  { name: '赵一诺', city: '成都', site: '锦江校区', className: '雅思强化B班', teacher: '吴倩', level: '低', days: 2, summary: '缺课1次已补齐，近期反馈转好，建议保持关注。', reasons: ['偶发缺课'] },
];

// 进步之星
export const progressStars: ProgressStar[] = [
  { name: '张可欣', city: '北京', site: '国贸校区', className: '雅思强化A班', teacher: '张萌', progressCount: 14, trajectory: [6.0, 6.0, 6.5, 6.5, 7.0], highlight: '写作论证充分性显著提升，Task2 稳定 6.5+' },
  { name: '赵梓萱', city: '北京', site: '国贸校区', className: '雅思冲刺C班', teacher: '张萌', progressCount: 11, trajectory: [6.5, 6.5, 7.0, 7.0], highlight: '听力同义替换反应快，信号词定位准确' },
  { name: '李昊然', city: '北京', site: '国贸校区', className: '雅思强化A班', teacher: '张萌', progressCount: 10, trajectory: [5.5, 5.5, 6.0, 6.5], highlight: '口语流利度提升，语流停顿减少，突破 6.5' },
  { name: '陈雨桐', city: '北京', site: '望京校区', className: '雅思基础B班', teacher: '王雅静', progressCount: 9, trajectory: [4.5, 5.0, 5.0, 5.5], highlight: '词汇积累见效，阅读细节定位提速' },
  { name: '林可儿', city: '深圳', site: '南山校区', className: '雅思冲刺A班', teacher: '李思远', progressCount: 8, trajectory: [6.0, 6.5, 6.0, 6.5], highlight: '标题段落匹配正确率提升至 85%' },
  { name: '周晓彤', city: '上海', site: '徐汇校区', className: '雅思强化D班', teacher: '陈默', progressCount: 7, trajectory: [5.5, 5.5, 6.0, 6.0], highlight: '写作逻辑链延展改善，连贯衔接进步' },
];

// 学员问题趋势热力图：维度 × 周
export const heatmapWeeks = ['6/2', '6/9', '6/16', '6/23', '6/30', '7/7', '7/14', '7/21'];
export const heatmapDims = ['听力', '阅读', '写作', '口语', '学习行为', '风险预警'];
// [dim][week] = 问题出现频次
export const heatmapData: number[][] = [
  [32, 35, 41, 38, 45, 42, 48, 51], // 听力
  [40, 38, 44, 47, 43, 50, 46, 53], // 阅读
  [55, 52, 58, 61, 57, 63, 66, 70], // 写作
  [38, 42, 39, 45, 48, 44, 52, 56], // 口语
  [26, 24, 29, 27, 31, 28, 33, 30], // 学习行为
  [12, 15, 18, 14, 21, 19, 24, 27], // 风险预警
];

export const kpis = [
  { label: '在学学员', value: '286', unit: '人', delta: '+12 本月新入班', up: true },
  { label: '授课教师', value: '24', unit: '人', delta: '覆盖 8 城 12 校区', up: true },
  { label: '反馈提交及时率', value: '91', unit: '%', delta: '+3% 较上月', up: true },
  { label: '反馈有效解析率', value: '88', unit: '%', delta: '+5% 较上月', up: true },
  { label: '风险学员', value: '23', unit: '人', delta: '-4 较上周', up: false },
  { label: '学员平均提分', value: '+0.8', unit: '分', delta: '最近一轮模考', up: true },
];

// 班级成绩管理（教学主管看板）
export interface ClassGrade {
  id: string;
  name: string;
  teacher: string;
  site: string;
  students: number;
  avgScore: number; // 最近一轮模考均分
  highRate: number; // 高分率：7.0+ 学员占比 %
  improveRate: number; // 提分率：较入学提分 ≥0.5 学员占比 %
  hours: number; // 近30天课量（课时）
}

export const classGrades: ClassGrade[] = [
  { id: 'cg1', name: '雅思冲刺C班', teacher: '张萌', site: '北京·国贸校区', students: 8, avgScore: 6.8, highRate: 50, improveRate: 88, hours: 22 },
  { id: 'cg2', name: '雅思强化A班', teacher: '张萌', site: '北京·国贸校区', students: 12, avgScore: 6.3, highRate: 25, improveRate: 75, hours: 20 },
  { id: 'cg3', name: '雅思基础B班', teacher: '王雅静', site: '北京·望京校区', students: 10, avgScore: 5.6, highRate: 0, improveRate: 80, hours: 20 },
  { id: 'cg4', name: '雅思阅读专项班', teacher: '孙立群', site: '北京·中关村校区', students: 14, avgScore: 6.1, highRate: 14, improveRate: 64, hours: 26 },
  { id: 'cg5', name: '雅思强化D班', teacher: '陈默', site: '上海·徐汇校区', students: 11, avgScore: 5.9, highRate: 9, improveRate: 45, hours: 24 },
  { id: 'cg6', name: '雅思基础C班', teacher: '林晓丹', site: '上海·浦东校区', students: 13, avgScore: 5.7, highRate: 0, improveRate: 69, hours: 24 },
  { id: 'cg7', name: '雅思冲刺A班', teacher: '李思远', site: '深圳·南山校区', students: 10, avgScore: 6.6, highRate: 40, improveRate: 80, hours: 24 },
  { id: 'cg8', name: '口语专项班', teacher: '李思远', site: '深圳·南山校区', students: 6, avgScore: 6.2, highRate: 17, improveRate: 67, hours: 12 },
  { id: 'cg9', name: '雅思强化C班', teacher: '黄志文', site: '深圳·福田校区', students: 15, avgScore: 6.0, highRate: 13, improveRate: 60, hours: 30 },
  { id: 'cg10', name: '雅思基础A班', teacher: '周凯文', site: '合肥·政务校区', students: 12, avgScore: 5.5, highRate: 0, improveRate: 58, hours: 22 },
  { id: 'cg11', name: '雅思强化B班', teacher: '吴倩', site: '成都·锦江校区', students: 12, avgScore: 6.2, highRate: 17, improveRate: 75, hours: 24 },
  { id: 'cg12', name: '写作单项班', teacher: '吴倩', site: '成都·锦江校区', students: 6, avgScore: 6.0, highRate: 17, improveRate: 67, hours: 14 },
];

export const gradeKpis = [
  { label: '在学学员', value: '286', unit: '人', delta: '+12 本月新入班' },
  { label: '高分率（7.0+）', value: '18', unit: '%', delta: '+4% 较上月' },
  { label: '提分率（≥0.5分）', value: '76', unit: '%', delta: '较入学成绩' },
  { label: '全职教师月均课时', value: '86', unit: '课时/月', delta: '全职 18 人 · 近 3 个月均值' },
  { label: '风险学员', value: '23', unit: '人', delta: '-4 较上周' },
  { label: '学员平均提分', value: '+0.8', unit: '分', delta: '最近一轮模考' },
];

// ==================== 试听课转化（数据来源：启德考培试听课数据统计报表，2026-01-01 至 2026-07-26） ====================

// 本月（2026年7月）核心指标
export const trialKpis = {
  month: '2026年7月',
  trials: 711,        // 试听课个数
  deals: 453,         // 关单数
  dealRate: 63.7,     // 关单率 %
  successRate: 67.2,  // 成功率（含关单+逾期签单）%
  avgConvertDays: 2.4, // 平均转化用时（天，2026年1-7月签约样本）
  within3Days: 75.8,   // 3 天内签约占比 %
};

// 月度趋势（报表「按月统计」合计行）
export const trialMonthly = [
  { month: '1月', trials: 753, dealRate: 52.7, successRate: 57.6 },
  { month: '2月', trials: 351, dealRate: 57.0, successRate: 65.0 },
  { month: '3月', trials: 981, dealRate: 58.7, successRate: 63.8 },
  { month: '4月', trials: 609, dealRate: 57.6, successRate: 63.4 },
  { month: '5月', trials: 562, dealRate: 49.8, successRate: 52.9 },
  { month: '6月', trials: 688, dealRate: 52.9, successRate: 60.2 },
  { month: '7月', trials: 711, dealRate: 63.7, successRate: 67.2 },
];

// 教师试听转化榜（2026年1-7月，试听 ≥5 次）
export const trialTeacherTop = [
  { name: '李哲豪', trials: 19, success: 19, rate: 100 },
  { name: '张藏月', trials: 11, success: 11, rate: 100 },
  { name: '刘镇皓', trials: 10, success: 10, rate: 100 },
  { name: '李芝聪乐', trials: 8, success: 8, rate: 100 },
  { name: '马瑞芸', trials: 8, success: 8, rate: 100 },
];
export const trialTeacherBottom = [
  { name: '车羽悦', trials: 5, success: 0, rate: 0 },
  { name: '周佳琪', trials: 8, success: 1, rate: 12.5 },
  { name: '侯涛', trials: 7, success: 1, rate: 14.3 },
  { name: '魏琳蕙', trials: 7, success: 1, rate: 14.3 },
  { name: '王若愚', trials: 12, success: 2, rate: 16.7 },
];

// 校区试听量分布（2026年1-7月，按试听量 TOP6）
export const trialCampuses = [
  { name: '济南考培', trials: 669, successRate: 59.2 },
  { name: '北京考培', trials: 529, successRate: 53.9 },
  { name: '广州考培', trials: 360, successRate: 57.5 },
  { name: '上海考培', trials: 296, successRate: 57.8 },
  { name: '深圳考培', trials: 270, successRate: 54.8 },
  { name: '武汉考培', trials: 239, successRate: 56.1 },
];
