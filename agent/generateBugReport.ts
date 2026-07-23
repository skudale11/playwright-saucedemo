export async function generateBugReport(
  testName: string,
  errorMessage: string,
  filePath: string
): Promise<string> {
  const prompt = `You are a QA engineer. A Playwright test has failed. Write a clear, concise bug report.

Test name: ${testName}
File: ${filePath}
Error: ${errorMessage}

Write the bug report in this exact format:
**Summary:** One line description of the bug
**Steps to reproduce:** What the test was doing
**Expected result:** What should have happened
**Actual result:** What actually happened
**Severity:** Critical / High / Medium / Low`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY || '',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await response.json();
  return data.content[0].text;
}