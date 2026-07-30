// 雅思智能学习平台 · 四端演示数据（学生/教师/班主任/管理）

// ============ 学生端 ============

export interface StudyTask {
  id: string;
  kind: '课前预习' | '课后作业' | '自主练习';
  subject: '听力' | '阅读' | '写作' | '口语' | '词汇';
  title: string;
  detail: string;
  deadline: string;
  status: '待完成' | '进行中' | '已完成' | '已逾期';
  progress: number; // %
}

export const studentTasks: StudyTask[] = [
  { id: 'st1', kind: '课前预习', subject: '阅读', title: '填空题诊断预习', detail: '剑21-Test1-Passage1 填空题，定位与预判策略预习', deadline: '今晚 22:00', status: '进行中', progress: 40 },
  { id: 'st2', kind: '课后作业', subject: '听力', title: '选择题专项', detail: '剑20-Test1 听力 Section3 选择题，共 6 题', deadline: '明天 18:00', status: '待完成', progress: 0 },
  { id: 'st3', kind: '课后作业', subject: '写作', title: 'Task1 图表描述', detail: '完成一篇线图描述作文，不少于 150 字', deadline: '明天 22:00', status: '待完成', progress: 0 },
  { id: 'st4', kind: '课后作业', subject: '口语', title: 'Part2 话题卡', detail: 'Describe a person who inspired you，录音 2 分钟', deadline: '7-28 12:00', status: '待完成', progress: 0 },
  { id: 'st5', kind: '课前预习', subject: '听力', title: '地图题专项预习', detail: '地图题方位词速记 + 起始点路径跟踪', deadline: '7-29 09:00', status: '待完成', progress: 0 },
  { id: 'st6', kind: '自主练习', subject: '词汇', title: '复习剑21核心词汇 Unit 3', detail: 'AI 根据你的阅读错题推送的关联词汇 40 个', deadline: '无截止', status: '进行中', progress: 65 },
  { id: 'st7', kind: '课后作业', subject: '听力', title: '精听练习 Section 3', detail: '剑19-Test2-Section3 逐句精听与听写', deadline: '7-25 22:00', status: '已逾期', progress: 70 },
  { id: 'st8', kind: '课后作业', subject: '阅读', title: '判断题 TRUE/FALSE/NOT GIVEN', detail: '剑21-Test2-Passage2 判断题 8 题', deadline: '7-24 22:00', status: '已完成', progress: 100 },
];

export interface WrongQuestion {
  id: string;
  subject: '听力' | '阅读' | '写作' | '口语';
  source: string;
  type: string;
  status: '待二刷' | '已二刷' | '已分析' | '已掌握';
  wrongReason: string;
  aiNote: string;
}

export const wrongQuestions: WrongQuestion[] = [
  { id: 'wq1', subject: '阅读', source: '剑21-Test1-P1 Q4', type: '填空题', status: '待二刷', wrongReason: '定位句找错段落', aiNote: '应填入名词短语，与gallery相关；注意专有名词定位后向后找同义替换' },
  { id: 'wq2', subject: '阅读', source: '剑21-Test1-P1 Q7', type: '填空题', status: '待二刷', wrongReason: '词性预判失误', aiNote: '应填入形容词，修饰名词；先预判词性再定位' },
  { id: 'wq3', subject: '听力', source: '剑20-Test1-S3 Q28', type: '选择题', status: '已二刷', wrongReason: '被干扰项误导', aiNote: '注意 absolutely 等绝对化词汇，原文可能未提及或与此矛盾' },
  { id: 'wq4', subject: '听力', source: '剑20-Test1-S3 Q30', type: '选择题', status: '已分析', wrongReason: '信号词漏听', aiNote: 'however 转折后为正确答案高发区，建议精听该句 3 遍' },
  { id: 'wq5', subject: '阅读', source: '剑19-Test3-P2 Q19', type: '判断题', status: '已掌握', wrongReason: 'FALSE 与 NOT GIVEN 混淆', aiNote: '原文无明确矛盾即为 NOT GIVEN，不要过度推理' },
  { id: 'wq6', subject: '写作', source: 'Task2 教育类', type: '议论文', status: '待二刷', wrongReason: '论证展开不足', aiNote: '主体段仅给出观点缺少例证，建议按「观点→解释→例子→小结」展开' },
  { id: 'wq7', subject: '口语', source: 'Part2 人物题', type: '话题卡', status: '已分析', wrongReason: '内容单薄不足1分钟', aiNote: '用 5W1H 框架展开：who/when/where/what/why/how，每条补充细节' },
  { id: 'wq8', subject: '听力', source: '剑21-Test2-S4 Q36', type: '填空题', status: '已二刷', wrongReason: '拼写错误', aiNote: 'accommodation 双写 c 双写 m，已加入你的拼写易错词表' },
];

export interface MockExam {
  name: string;
  date: string;
  L: number; R: number; W: number; S: number;
  total: number;
}

export const mockExams: MockExam[] = [
  { name: '入学模考', date: '2026-05-10', L: 5.5, R: 5.5, W: 5.0, S: 5.0, total: 5.5 },
  { name: '阶段模考1', date: '2026-05-31', L: 6.0, R: 5.5, W: 5.0, S: 5.5, total: 5.5 },
  { name: '阶段模考2', date: '2026-06-21', L: 6.0, R: 6.0, W: 5.5, S: 5.5, total: 6.0 },
  { name: '阶段模考3', date: '2026-07-12', L: 6.5, R: 6.0, W: 5.5, S: 6.0, total: 6.0 },
];

// 能力雷达（听说读写分维度）
export const radarData = [
  { group: '听力', dims: ['信息捕捉', '细节理解', '主旨把握', '推理判断', '拼写准确'], scores: [78, 72, 68, 60, 74] },
  { group: '阅读', dims: ['定位能力', '词汇理解', '主旨理解', '同义替换'], scores: [70, 65, 66, 58] },
  { group: '写作', dims: ['任务回应', '连贯衔接', '词汇多样性', '语法准确', '语法多样'], scores: [62, 58, 55, 60, 52] },
  { group: '口语', dims: ['流利度与连贯性', '语法准确性和多样性', '发音'], scores: [64, 58, 66] },
];

export const studentSchedule = [
  { day: '今天', date: '7-27 周一', course: '听力·地图题专项突破', time: '19:00-21:00', teacher: '张萌', focus: ['地图题方位词速记', '起始点与路径跟踪', '干扰信息排除'], status: '待上课' },
  { day: '明天', date: '7-28 周二', course: '写作·Task2 议论文结构与论证', time: '19:00-21:00', teacher: '张萌', focus: ['议论文四段式结构', '论点展开与论据支持', '连接词与逻辑衔接'], status: '待上课' },
  { day: '后天', date: '7-29 周三', course: '阅读·判断题 TRUE/FALSE/NOT GIVEN', time: '19:00-21:00', teacher: '孙立群', focus: ['判断题出题逻辑', '绝对化词汇识别', '推理 vs. 矛盾'], status: '待上课' },
  { day: '周日', date: '8-02 周日', course: '口语·Part3 深度讨论', time: '14:00-16:00', teacher: '赵梦琪', focus: ['抽象观点论证', '个性化表达'], status: '待上课' },
];

export const studentInfo = {
  name: '张可欣',
  studentId: 'IELTS-2024-011',
  className: '雅思6.5→7.0冲刺全程班',
  classCode: '260708 班 · 周一/三/五',
  teacher: '张萌（雅思高级讲师）',
  advisor: '王倩',
  campus: '北京·国贸校区',
  enrollScore: 6.0,
  targetScore: 7.0,
};

// ============ 教师端 ============

export interface ClassInfo {
  id: string;
  name: string;
  schedule: string;
  students: number;
  progress: number; // 课程进度 %
  pendingGrading: number; // 待批改
  pendingFeedback: number; // 待写反馈
  riskCount: number;
}

export const teacherClasses: ClassInfo[] = [
  { id: 'c1', name: '雅思强化A班', schedule: '周一/三/五 19:00', students: 12, progress: 68, pendingGrading: 5, pendingFeedback: 1, riskCount: 2 },
  { id: 'c2', name: '雅思冲刺C班', schedule: '周二/四 19:00', students: 8, progress: 82, pendingGrading: 3, pendingFeedback: 0, riskCount: 1 },
];

export interface ClassStudent {
  name: string;
  attendance: number;
  homeworkRate: number;
  latestScore: number;
  trend: 'up' | 'flat' | 'down';
  risk?: string; // 风险原因
}

export const classStudents: Record<string, ClassStudent[]> = {
  c1: [
    { name: '张可欣', attendance: 98, homeworkRate: 100, latestScore: 7.0, trend: 'up' },
    { name: '李昊然', attendance: 95, homeworkRate: 92, latestScore: 6.5, trend: 'up' },
    { name: '王思远', attendance: 92, homeworkRate: 88, latestScore: 6.0, trend: 'flat' },
    { name: '杨紫涵', attendance: 97, homeworkRate: 85, latestScore: 6.5, trend: 'down', risk: '作业质量下滑' },
    { name: '刘志强', attendance: 70, homeworkRate: 45, latestScore: 5.0, trend: 'down', risk: '频繁缺课' },
  ],
  c2: [
    { name: '赵梓萱', attendance: 96, homeworkRate: 95, latestScore: 7.0, trend: 'up' },
    { name: '孙悦', attendance: 85, homeworkRate: 60, latestScore: 6.5, trend: 'down', risk: '学习动力不足' },
    { name: '周子墨', attendance: 90, homeworkRate: 82, latestScore: 6.0, trend: 'flat' },
  ],
};

// AI 反馈分析演示（教师提交评语后的模拟解析结果）
export const aiAnalysisDemo = {
  progress: [
    '听力信号词定位反应明显加快，Section3 选择题正确率提升',
    '课堂互动积极，主动回答问题 4 次',
  ],
  improvements: [
    '地图题方位词反应仍偏慢，from/behind/opposite 混淆',
    '课后作业订正不及时，上次作业错题未复盘',
  ],
  points: ['信号词定位', '地图方位词反应', '课堂参与度', '错题复盘习惯'],
  riskHint: '若连续两次作业未订正，建议列入「学习行为」关注名单',
};

// ============ 班主任端 ============

export interface FollowUpTask {
  id: string;
  student: string;
  className: string;
  reason: string;
  level: '高' | '中' | '低';
  due: string;
  status: '待跟进' | '已跟进';
  lastNote?: string;
}

export const followUpTasks: FollowUpTask[] = [
  { id: 'f1', student: '刘志强', className: '雅思强化A班', reason: '近两周缺课3次，作业连续未交', level: '高', due: '今天 18:00 前', status: '待跟进' },
  { id: 'f2', student: '王梓豪', className: '雅思强化D班', reason: '家长电话询问退费政策，需面谈安抚', level: '高', due: '今天 20:00 前', status: '待跟进' },
  { id: 'f3', student: '孙悦', className: '雅思冲刺C班', reason: '备考信心崩塌，主管已安排心理沟通', level: '高', due: '今天', status: '已跟进', lastNote: '已与学生通话30分钟，约定周三面谈；已同步家长降低分数预期' },
  { id: 'f4', student: '李思彤', className: '雅思基础A班', reason: '本月缺课2次，兼职影响学习', level: '中', due: '明天', status: '待跟进' },
  { id: 'f5', student: '陈俊宇', className: '雅思口语专项班', reason: '口语课缺勤2次未约补课', level: '中', due: '明天', status: '待跟进' },
  { id: 'f6', student: '何雨辰', className: '雅思冲刺A班', reason: '实习压力大，作业质量下滑', level: '低', due: '本周内', status: '已跟进', lastNote: '已与教师协商作业量减半，观察两周' },
];

export const parentComms = [
  { date: '2026-07-26', student: '孙悦', type: '电话', by: '王倩', note: '家长反映孩子近期失眠焦虑，已解释冲刺阶段正常现象，约定每周五同步学习周报' },
  { date: '2026-07-25', student: '王梓豪', type: '微信', by: '刘芳', note: '家长询问退费政策，已安抚并约周六到校面谈，同步教学主管备案' },
  { date: '2026-07-24', student: '刘志强', type: '面谈', by: '王倩', note: '家长到校，了解到父亲出差管教缺位，约定家长每日检查作业打卡' },
  { date: '2026-07-22', student: '张可欣', type: '微信', by: '王倩', note: '同步模考7.0好消息，家长非常满意，有意向续报口语专项班' },
];

export const renewals = [
  { student: '张可欣', className: '雅思冲刺C班', remaining: 4, intent: '高', note: '家长主动咨询口语专项班' },
  { student: '赵梓萱', className: '雅思冲刺C班', remaining: 6, intent: '高', note: '目标7.5，有续报一对一意向' },
  { student: '王思远', className: '雅思强化A班', remaining: 3, intent: '中', note: '家长观望出分情况' },
  { student: '周子墨', className: '雅思冲刺C班', remaining: 5, intent: '中', note: '需模考达标后续报' },
];

// ============ 管理端 · 教服主管 ============

export interface AdvisorPerf {
  name: string;
  site: string;
  students: number; // 在读学员
  todayFollowUps: string; // 今日跟进 完成/应完成
  parentComms: number; // 本周家长沟通次数
  renewalRate: number; // 续费率 %
  refundRisk: number; // 在处理退费预警数
  satisfaction: number; // 家长满意度 %
}

export const advisorPerf: AdvisorPerf[] = [
  { name: '王倩', site: '国贸校区', students: 68, todayFollowUps: '5/6', parentComms: 24, renewalRate: 78, refundRisk: 2, satisfaction: 96 },
  { name: '刘芳', site: '望京校区', students: 52, todayFollowUps: '3/5', parentComms: 18, renewalRate: 71, refundRisk: 1, satisfaction: 93 },
  { name: '李敏', site: '中关村校区', students: 45, todayFollowUps: '4/4', parentComms: 15, renewalRate: 74, refundRisk: 0, satisfaction: 95 },
  { name: '赵雪', site: '徐汇校区', students: 49, todayFollowUps: '2/6', parentComms: 12, renewalRate: 62, refundRisk: 2, satisfaction: 88 },
  { name: '陈晨', site: '南山校区', students: 41, todayFollowUps: '4/5', parentComms: 16, renewalRate: 69, refundRisk: 1, satisfaction: 91 },
];

export const serviceKpis = [
  { label: '在读学员', value: '286', unit: '人', delta: '退费率 2.1%（较上月 -0.6%）' },
  { label: '本周出勤率', value: '89', unit: '%', delta: '缺课预警 12 人已介入' },
  { label: '跟进任务完成率', value: '83', unit: '%', delta: '逾期未完成 5 项' },
  { label: '续费率', value: '71', unit: '%', delta: '+4% 较上季度' },
  { label: '家长满意度', value: '93', unit: '%', delta: '本月投诉 1 起（已结案）' },
];

// ============ 教师端五模块数据 ============

// 作业管理
export interface Assignment {
  id: string;
  subject: '听力' | '阅读' | '写作' | '口语';
  source: string; // 题库来源
  title: string;
  className: string;
  deadline: string;
  submitted: number;
  total: number;
  graded: number;
  gradedTotal: number;
  avg?: string;
}

export const assignments: Assignment[] = [
  { id: 'a1', subject: '写作', source: '雅托邦 · 9分真题库', title: '大作文：科技类话题（雅托邦·9分真题库 卷12）', className: '雅思强化A班', deadline: '2026-07-24 20:00', submitted: 9, total: 12, graded: 5, gradedTotal: 9, avg: '6.2' },
  { id: 'a2', subject: '口语', source: '雅托邦 · 口语题库 7月新题', title: '口语 Part2：Describe a person who inspired you', className: '雅思强化A班', deadline: '2026-07-25 20:00', submitted: 6, total: 12, graded: 0, gradedTotal: 6 },
  { id: 'a3', subject: '阅读', source: '雅托邦 · 剑雅真题 19', title: '阅读：Heading 题专项（剑雅19 Test2 Passage1）', className: '雅思基础B班', deadline: '2026-07-23 20:00', submitted: 10, total: 10, graded: 10, gradedTotal: 10, avg: '78' },
  { id: 'a4', subject: '听力', source: '雅托邦 · 剑雅真题 20', title: '听力：选择题精听（剑雅20 Test1 Section3）', className: '雅思冲刺C班', deadline: '2026-07-26 20:00', submitted: 3, total: 8, graded: 3, gradedTotal: 3, avg: '85' },
];

export const questionBanks = ['剑雅真题 4-20', '9分真题库', '全真模考 80套', '口语当季新题', '写作高频话题'];

// 资料管理
export interface Material {
  id: string;
  title: string;
  file: string;
  type: 'PPT课件' | '视频' | '音频' | 'PDF文档';
  stage: '课前预习' | '课后巩固';
  className: string;
  date: string;
  read: string; // 已读
}

export const materials: Material[] = [
  { id: 'm1', title: '大作文论证结构精讲', file: '大作文论证结构.pptx · 8.2 MB', type: 'PPT课件', stage: '课前预习', className: '雅思强化A班', date: '2026-07-21', read: '10/12' },
  { id: 'm2', title: '口语 Part2 高分示范', file: 'part2_demo_7.5.mp4 · 126 MB', type: '视频', stage: '课后巩固', className: '雅思强化A班', date: '2026-07-22', read: '7/12' },
  { id: 'm3', title: '剑雅19 Test2 听力原文精听', file: 'C19T2S3_shadowing.mp3 · 18 MB', type: '音频', stage: '课后巩固', className: '雅思基础B班', date: '2026-07-20', read: '9/10' },
  { id: 'm4', title: '地图题方位词速记手册', file: 'map_vocab.pdf · 2.4 MB', type: 'PDF文档', stage: '课前预习', className: '雅思冲刺C班', date: '2026-07-25', read: '5/8' },
];

// 授课反馈 · 待办课次
export interface PendingLesson {
  id: string;
  className: string;
  classCode: string;
  course: string;
  topic: string;
  time: string;
  status: '进行中' | '待开始' | '已结课';
  feedback: '未填写' | '草稿中' | '已提交';
  content: '未填写' | '已提交' | '无需填写';
}

export const pendingLessons: PendingLesson[] = [
  { id: 'l1', className: '雅思强化A班', classCode: '260708期', course: '雅思听力强化', topic: '第19讲 · 地图题专项突破', time: '今天 19:00-21:00', status: '待开始', feedback: '未填写', content: '未填写' },
  { id: 'l2', className: '雅思冲刺C班', classCode: '260720期', course: '雅思听力真题', topic: '第12讲 · 选择题干扰项排除', time: '今天 14:00-16:00', status: '已结课', feedback: '草稿中', content: '已提交' },
  { id: 'l3', className: '雅思强化A班', classCode: '260708期', course: '雅思写作提升', topic: '第18讲 · Task2 议论文结构', time: '07-24 19:00-21:00', status: '已结课', feedback: '已提交', content: '已提交' },
  { id: 'l4', className: '雅思基础B班', classCode: '260601期', course: '雅思阅读技巧', topic: '第10讲 · 判断题 TRUE/FALSE/NOT GIVEN', time: '07-23 19:00-21:00', status: '已结课', feedback: '已提交', content: '已提交' },
];

export const feedbackStudents = [
  { name: '张可欣', performance: 5, mastery: 4, cooperation: 5, note: '课堂表现积极，地图题路径跟踪有进步，建议课后加强方位词听写。' },
  { name: '李昊然', performance: 4, mastery: 4, cooperation: 5, note: '口语练习录音质量有提升，注意地图题起始点定位。' },
  { name: '王思远', performance: 3, mastery: 3, cooperation: 4, note: '作业完成情况良好，但方位词 from/behind 仍混淆，建议重听精讲片段。' },
  { name: '杨紫涵', performance: 4, mastery: 3, cooperation: 3, note: '写作句式单一问题需持续关注，已布置句型转换练习。' },
  { name: '刘志强', performance: 2, mastery: 2, cooperation: 2, note: '本次课未到，请班主任跟进；上次作业未交。' },
];

// 批改中心
export interface GradingItem {
  id: string;
  student: string;
  subject: '写作' | '口语';
  assignment: string;
  submitTime: string;
  content: string;
  aiScore: string;
  aiDetail: string;
  aiAdvice: string;
}

export const gradingQueue: GradingItem[] = [
  { id: 'g1', student: '王思远', subject: '写作', assignment: '大作文：科技类话题（雅托邦·9分真题库 卷12）', submitTime: '07-23 08:02', content: 'Nowadays technology is very important in our life. Some people think technology make our life easier, but others believe it brings problems...', aiScore: '5.5', aiDetail: 'TR 5.5 / CC 6.0 / LR 5.5 / GRA 5.5', aiAdvice: '主体段论点重复，建议合并第二、三段；增加具体例证' },
  { id: 'g2', student: '陈雨桐', subject: '写作', assignment: '大作文：科技类话题（雅托邦·9分真题库 卷12）', submitTime: '07-22 22:31', content: 'It is undeniable that technology has transformed the way we communicate...', aiScore: '6.0', aiDetail: 'TR 6.0 / CC 6.0 / LR 6.0 / GRA 5.5', aiAdvice: '论证结构清晰，注意主谓一致与单复数错误（共 6 处）' },
  { id: 'g3', student: '赵一诺', subject: '写作', assignment: '大作文：科技类话题（雅托邦·9分真题库 卷12）', submitTime: '07-23 10:15', content: 'With the rapid development of artificial intelligence...', aiScore: '6.0', aiDetail: 'TR 6.5 / CC 6.0 / LR 6.0 / GRA 5.5', aiAdvice: '观点明确，连接词使用恰当；注意冠词缺失问题' },
  { id: 'g4', student: '张可欣', subject: '口语', assignment: '口语 Part2：Describe a person who inspired you', submitTime: '07-23 20:05', content: '录音 02:14 · 已转写：The person who inspired me most is my grandmother...', aiScore: '6.5', aiDetail: '流利度 6.5 / 词汇 6.5 / 语法 6.0 / 发音 7.0', aiAdvice: '内容充实有细节，注意过去时态一致性；重音位置准确' },
  { id: 'g5', student: '王思远', subject: '口语', assignment: '口语 Part2：Describe a person who inspired you', submitTime: '07-23 21:44', content: '录音 01:32 · 已转写：I want to talk about my English teacher...', aiScore: '5.5', aiDetail: '流利度 5.5 / 词汇 5.5 / 语法 5.5 / 发音 6.0', aiAdvice: '时长不足，细节展开不够；建议用 5W1H 框架补充 2-3 个细节' },
  { id: 'g6', student: '刘子墨', subject: '口语', assignment: '口语 Part2：Describe a person who inspired you', submitTime: '07-24 07:58', content: '录音 01:58 · 已转写：My father is the person who inspired me...', aiScore: '6.0', aiDetail: '流利度 6.0 / 词汇 6.0 / 语法 5.5 / 发音 6.5', aiAdvice: '叙事完整，注意 he/she 混用；结尾可升华主题' },
];

export const quickComments = ['论证有力', '注意审题', '语法错误偏多', '进步明显', '建议重听精讲', '细节展开充分'];

// 班级学情
export interface ClassAnalytic {
  name: string;
  students: number;
  submitRate: number;
  accuracy: number;
  progress: string;
  dist: { range: string; count: number }[];
  trends: Record<string, { scores: number[]; weak: string[] }>;
}

export const classAnalytics: Record<'c1' | 'c2', ClassAnalytic> = {
  c1: {
    name: '雅思强化A班',
    students: 12, submitRate: 63, accuracy: 79, progress: '18/32 课时',
    dist: [
      { range: '5.0-5.5', count: 2 }, { range: '5.5-6.0', count: 4 }, { range: '6.0-6.5', count: 8 }, { range: '6.5-7.0', count: 6 }, { range: '7.0+', count: 3 },
    ],
    trends: {
      张可欣: { scores: [6.0, 6.0, 6.5, 6.5, 7.0, 7.0], weak: ['地图题', 'Heading题'] },
      李昊然: { scores: [5.5, 5.5, 6.0, 6.0, 6.5, 6.5], weak: ['词汇丰富度'] },
      王思远: { scores: [5.5, 6.0, 5.5, 6.0, 6.0, 6.0], weak: ['判断题', '作文论证'] },
      杨紫涵: { scores: [6.5, 6.5, 6.5, 6.0, 6.5, 6.5], weak: ['句式复杂度'] },
      刘志强: { scores: [5.5, 5.0, 5.5, 5.0, 5.0, 5.0], weak: ['速记笔记', '出勤'] },
    },
  },
  c2: {
    name: '雅思冲刺C班',
    students: 8, submitRate: 78, accuracy: 84, progress: '26/32 课时',
    dist: [
      { range: '5.5-6.0', count: 1 }, { range: '6.0-6.5', count: 3 }, { range: '6.5-7.0', count: 5 }, { range: '7.0+', count: 4 },
    ],
    trends: {
      赵梓萱: { scores: [6.5, 6.5, 7.0, 7.0, 7.0, 7.5], weak: ['Task1 数据选取'] },
      孙悦: { scores: [6.5, 6.5, 6.0, 6.5, 6.5, 6.5], weak: ['备考心态', '写作速度'] },
      周子墨: { scores: [5.5, 6.0, 6.0, 6.0, 6.0, 6.5], weak: ['口语流利度'] },
    },
  },
};

// ==================== 教师工作台首页 ====================

export const teacherHome = {
  greeting: {
    name: '张萌',
    summary: '今天有 2 节课，6 份作业待批改，3 节课待填写反馈',
  },
  stats: [
    { label: '我的班级', value: '4', unit: '个' },
    { label: '学员总数', value: '87', unit: '人' },
    { label: '本周课次', value: '6', unit: '节' },
    { label: '待批改作业', value: '6', unit: '份' },
  ],
  todayClasses: [
    { time: '10:00–12:00', title: '地图题专项突破', klass: '260708 雅思6.5分全科班', subject: '听力' },
    { time: '14:00–16:00', title: '判断题 TRUE / FALSE / NOT GIVEN', klass: '260720 雅思7.0分冲刺班', subject: '阅读' },
  ],
  attention: [
    { name: '陈浩然', level: '高风险', reason: '作业完成率仅 60%，连续下降' },
    { name: '周静怡', level: '高风险', reason: '阅读成绩退步，近两次缺交' },
  ],
  myClasses: [
    { name: '260708 雅思6.5分全科班', schedule: '周一 / 三 / 五 10:00–12:00', students: 24, avg: 6.0, progress: 28, total: 48 },
    { name: '260720 雅思7.0分冲刺班', schedule: '周二 / 四 / 六 14:00–16:00', students: 18, avg: 6.5, progress: 15, total: 36 },
  ],
  scoreRates: [
    { label: '本月提分率', value: '16.1%', detail: '9 ÷ 56（去重）' },
    { label: '本月高分率', value: '5.4%', detail: '3 ÷ 56（去重）' },
    { label: '本季度提分率', value: '23.4%', detail: '15 ÷ 64（去重）' },
    { label: '本季度高分率', value: '10.9%', detail: '7 ÷ 64（去重）' },
  ],
  topImprovers: [
    { name: '孙博远', from: 5.5, to: 7.0, delta: '+1.5' },
    { name: '张雨晴', from: 5.5, to: 6.5, delta: '+1.0' },
    { name: '李明', from: 5.5, to: 6.5, delta: '+1.0' },
  ],
  pendingFeedback: [
    { title: '阅读判断题专项', time: '今天 14:00', students: 18, status: '课后待填', overdue: false },
    { title: '口语 Part 1 高频话题', time: '昨天 16:00', students: 12, status: '已超时', overdue: true },
  ],
};
