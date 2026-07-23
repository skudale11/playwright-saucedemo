export async function fileJiraTicket(
  testName: string,
  bugReport: string
): Promise<string> {
  const jiraUrl = process.env.JIRA_URL || '';
  const jiraEmail = process.env.JIRA_EMAIL || '';
  const jiraToken = process.env.JIRA_API_TOKEN || '';
  const jiraProject = process.env.JIRA_PROJECT_KEY || '';

  const credentials = Buffer.from(`${jiraEmail}:${jiraToken}`).toString('base64');

  const response = await fetch(`${jiraUrl}/rest/api/3/issue`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        project: { key: jiraProject },
        summary: `[Playwright] Test failed: ${testName}`,
        description: {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: bugReport }],
            },
          ],
        },
       issuetype: { name: 'Task' },
      },
    }),
  });

  const data = await response.json();
  
  if (data.key) {
    return `${jiraUrl}/browse/${data.key}`;
  } else {
    throw new Error(`Jira error: ${JSON.stringify(data)}`);
  }
}