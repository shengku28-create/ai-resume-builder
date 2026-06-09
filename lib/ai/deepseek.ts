const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1';

interface AIResponse {
  content: string;
  usage?: { prompt_tokens: number; completion_tokens: number };
}

async function callDeepSeek(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  model: string = 'deepseek-chat',
  temperature: number = 0.7
): Promise<AIResponse> {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DeepSeek API key not configured');
  }

  const response = await fetch(`${DEEPSEEK_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`DeepSeek API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';

  return {
    content: content.trim(),
    usage: data.usage,
  };
}

export async function optimizeSummary(summary: string, jobDescription?: string): Promise<string> {
  const prompt = jobDescription
    ? `作为一名专业的简历顾问，请优化以下个人职业概述，使其更符合目标职位的描述。请保持真实、简洁、有吸引力，突出相关技能和成就。

目标职位描述：
${jobDescription}

当前概述：
${summary}

请直接返回优化后的概述，不要添加任何额外解释。使用中文。`
    : `作为一名专业的简历顾问，请优化以下个人职业概述，使其更专业、简洁、有吸引力。突出关键技能和成就，使用有力的动词。

当前概述：
${summary}

请直接返回优化后的概述，不要添加任何额外解释。使用中文。`;

  const result = await callDeepSeek([
    { role: 'system', content: 'You are a professional resume consultant. You optimize resume content to make it more impactful, concise, and tailored to specific job roles. Always respond in the same language as the input.' },
    { role: 'user', content: prompt },
  ]);

  return result.content;
}

export async function optimizeExperience(experiences: Array<{ company: string; position: string; description: string }>): Promise<Array<{ description: string; improvements: string[] }>> {
  const prompt = `作为一名专业的简历顾问，请优化以下工作经历描述，使其更专业、更有说服力。使用STAR法则（情境-任务-行动-结果）重写每个描述，突出量化成果。

工作经历：
${JSON.stringify(experiences, null, 2)}

请返回JSON格式的优化结果，格式如下：
[
  {
    "description": "优化后的描述",
    "improvements": ["改进点1", "改进点2"]
  }
]

请直接返回JSON，不要添加任何额外解释。`;

  const result = await callDeepSeek([
    { role: 'system', content: 'You are a professional resume consultant. Optimize experience descriptions using STAR method with quantifiable achievements.' },
    { role: 'user', content: prompt },
  ]);

  try {
    const jsonStr = result.content.replace(/```json\s?/g, '').replace(/```\s?/g, '').trim();
    return JSON.parse(jsonStr);
  } catch {
    return experiences.map(exp => ({
      description: exp.description,
      improvements: ['优化完成'],
    }));
  }
}

export async function generateSummary(profile: { position: string; experience: string; skills: string }): Promise<string> {
  const prompt = `根据以下信息，为一位求职者生成一段专业的个人职业概述（150-250字）：

目标职位：${profile.position}
相关经验：${profile.experience}
核心技能：${profile.skills}

要求：
1. 突出核心竞争力
2. 简洁有力
3. 使用中文
4. 直接返回概述内容`;

  const result = await callDeepSeek([
    { role: 'system', content: 'You are a professional resume consultant. Generate compelling resume summaries.' },
    { role: 'user', content: prompt },
  ]);

  return result.content;
}

export async function optimizeSkills(skills: string[], jobDescription?: string): Promise<{ skills: Array<{ name: string; level: string }>; suggestions: string[] }> {
  const prompt = jobDescription
    ? `根据以下职位描述，优化求职者的技能列表。添加相关技能建议，并评估每个技能的熟练度等级。

职位描述：
${jobDescription}

当前技能：
${skills.join(', ')}

请返回JSON格式：
{
  "skills": [{"name": "技能名", "level": "beginner|intermediate|advanced|expert"}],
  "suggestions": ["建议添加的技能1", "建议添加的技能2"]
}

请直接返回JSON。`
    : `请对以下技能进行分类和熟练度评估，并提供建议添加的相关技能：

当前技能：
${skills.join(', ')}

请返回JSON格式：
{
  "skills": [{"name": "技能名", "level": "beginner|intermediate|advanced|expert"}],
  "suggestions": ["建议添加的技能1"]
}

请直接返回JSON。`;

  const result = await callDeepSeek([
    { role: 'system', content: 'You are a professional resume consultant. Analyze and optimize skill lists.' },
    { role: 'user', content: prompt },
  ]);

  try {
    const jsonStr = result.content.replace(/```json\s?/g, '').replace(/```\s?/g, '').trim();
    return JSON.parse(jsonStr);
  } catch {
    return {
      skills: skills.map(s => ({ name: s, level: 'intermediate' })),
      suggestions: ['建议补充更多具体技术栈'],
    };
  }
}

export async function generateCoverLetter(jobTitle: string, companyName: string, resumeContent: string): Promise<string> {
  const prompt = `请为一位求职者生成一封专业的求职信：

目标职位：${jobTitle}
目标公司：${companyName}

简历内容：
${resumeContent}

要求：
1. 专业、有说服力
2. 突出与职位匹配的技能
3. 表达热情和诚意
4. 约300-400字
5. 使用中文`;

  const result = await callDeepSeek([
    { role: 'system', content: 'You are a professional cover letter writer.' },
    { role: 'user', content: prompt },
  ]);

  return result.content;
}
