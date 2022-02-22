import {test, expect} from '@playwright/test';


test('Every question has a graph',async ({page}) => {

    await page.goto('https://app.quantilope.com/share/t2tywqPDXXMNjSzN4?type=dashboard');
    await page.locator('[data-testid="uc-accept-all-button"]').click();
    const q1 = await page.isVisible('text=q1 Best Label colour');
    expect(q1).toBeTruthy();
    const q2 = await page.isVisible('text=q2 How many people does one wheel of cheese feed');
    expect(q2).toBeTruthy();
    const q3 = await page.isVisible('text=q3 Personal Cheese opinions');
    expect(q3).toBeTruthy();
}) 

test('Chart updated with survey ',async ({page, context}) => {

    await page.goto('https://app.quantilope.com/share/t2tywqPDXXMNjSzN4?type=dashboard');
    await page.locator('[data-testid="uc-accept-all-button"]').click();
    const n = await (await page.locator('.highcharts-root').nth(2).textContent()).split('=').pop().slice(0,-1);

    const pageSurvey = await context.newPage();
    await pageSurvey.goto('https://survey.quantilope.com/SfidqfGjdrvMzwzWK/PpMhRtLAcmTjuX2M3/9xednGW4bJAGd7sv2');
    await pageSurvey.locator('text=Get Started').click();
    await pageSurvey.locator('.qRadioDisplay').first().click();
    await pageSurvey.locator('text=Next').click();
    await pageSurvey.locator('[placeholder="Type\\ in\\ your\\ value"]').click();
    await pageSurvey.locator('[placeholder="Type\\ in\\ your\\ value"]').fill('3');
    await pageSurvey.locator('text=Next').click();
    await pageSurvey.locator('.matrixRow div:nth-child(2) .qRadio label .qRadioDisplay').click();
    await pageSurvey.locator('text=Next').click();

    await page.reload();
    const nUpdated = await (await page.locator('.highcharts-root').nth(2).textContent()).split('=').pop().slice(0,-1);
    expect(n).toEqual(nUpdated);
}) 

test('Partially completed survey updated in the graph',async ({page, context}) => {
    
    await page.goto('https://app.quantilope.com/share/t2tywqPDXXMNjSzN4?type=dashboard');
    await page.locator('[data-testid="uc-accept-all-button"]').click();
    const n = await (await page.locator('.highcharts-root').nth(2).textContent()).split('=').pop().slice(0,-1);

    const pageSurvey = await context.newPage();
    await pageSurvey.goto('https://survey.quantilope.com/SfidqfGjdrvMzwzWK/PpMhRtLAcmTjuX2M3/9xednGW4bJAGd7sv2');
    await pageSurvey.locator('text=Get Started').click();
    await pageSurvey.locator('.qRadioDisplay').first().click();
    await pageSurvey.locator('text=Next').click();

    await page.reload();
    const nUpdated = await (await page.locator('.highcharts-root').nth(2).textContent()).split('=').pop().slice(0,-1);
    //expect(Number(n)).toBeGreaterThan(Number(nUpdated));
})