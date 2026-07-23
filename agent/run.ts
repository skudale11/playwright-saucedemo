import { parseFailures } from './parseResults';
import { generateBugReport } from './generateBugReport';
import { fileJiraTicket } from './fileJiraTicket';

async function main() {
  const failures = parseFailures();
  console.log(`Found ${failures.length} failures\n`);

  for (const failure of failures) {
    console.log(`Generating bug report for: ${failure.testName}`);
    const report = await generateBugReport(
      failure.testName,
      failure.errorMessage,
      failure.filePath
    );
    console.log('\n--- BUG REPORT ---');
    console.log(report);
    console.log('------------------\n');

    console.log('Filing Jira ticket...');
    const ticketUrl = await fileJiraTicket(failure.testName, report);
    console.log(`Ticket created: ${ticketUrl}\n`);
  }
}

main();