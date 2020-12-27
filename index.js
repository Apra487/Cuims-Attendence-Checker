const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.OWNER_EMAIL,
		pass: process.env.OWNER_EMAIL_PASSWORD,
	},
});
const mailOptions = {
	from: process.env.OWNER_EMAIL,
	to: process.env.RECIEVER_EMAIL,
	subject: '',
	text: ' ',
	html: '',
	attachments: [
		{
			filename: '',
			path: '',
			cid: '',
		},
		{
			filename: '',
			path: '',
		},
	],
};

(async () => {
	const browser = await puppeteer.launch({
		defaultViewport: null,
		headless: true,
	});
	const page = await browser.newPage();
	await page.goto(
		'https://uims.cuchd.in/uims/',
		{ timeout: 60000 },
		{ waitUntil: 'networkidle0' }
	);
	await page.waitForSelector('#txtUserId', { timeout: 60000 });
	await page.type('#txtUserId', process.env.UID); 
	await page.keyboard
		.press('Enter')
		.catch((e) => console.log('Internet Problem'));
	await page.waitFor(2000);
	await page.type('#txtLoginPassword', process.env.PASSWORD);
	await page.waitFor(2000);
	await page.keyboard
		.press('Enter')
		.catch((e) => console.log('Internet Problem'));
	await page.waitFor(20000);
	await page
		.waitForSelector('div.header-left > div.toggle-btn', { timeout: 60000 })
		.catch((e) => {
			console.log('Something went wrong!');
			return 1;
		});
	let clickl = await page.$('div.header-left > div.toggle-btn').catch((e) => {
		console.log('Something went wrong!');
		return 1;
	});
	await page.waitFor(9000).catch((e) => {
		console.log('Something went wrong!');
		return 1;
	});
	await clickl.click().catch((e) => {
		console.log('Something went wrong!');
		return 1;
	});
	await page.waitFor(20000);
	let drop = await page.$('#menu-content a').catch((e) => {
		console.log('Something went wrong!');
		return 1;
	});
	await page.waitFor(2000);
	await drop.click().catch((e) => {
		//TODO: Sending error details via e-mail
		mailOptions.subject = 'Something went wrong!!';
		mailOptions.text = 'Please open CUIMS to resolve!!';
		console.log('yo bitch');
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('yo');
				console.log('Email sent: ' + info.response);
			}
		});
		console.log('Something went wrong0!');
		return 1;
	});
	await page.waitFor(2000);
	let attendence = await page
		.$x('/html/body/form/div[4]/div[1]/div/div[1]/ul/ul[1]/li[2]/a')
		.catch((e) => {
			console.log('Something went wrong!');
			return 1;
		});
	await page.waitFor(2000);
	await attendence[0].click();
	await page.waitFor(30000);
	await page
		.waitForXPath('/html/body/form/div[4]/div[3]/div/table/tbody/tr[8]')
		.catch((e) => {
			console.log('Something went wrong!');
			return 1;
		});
	let date = new Date().toString();

	// TODO: Taking ScreenShot
	await page.screenshot({
		path: `./Attendence/${date}.png`,
		type: 'png',
		fullPage: true,
	});
	let obj = {};

	// TODO: Collecting data
	for (let i = 1; i < 3; i++) {
		let sub = await page.$x(
			`/html/body/form/div[4]/div[3]/div/table/tbody/tr[${i}]/td[2]`
		);
		let percent = await page.$x(
			`/html/body/form/div[4]/div[3]/div/table/tbody/tr[${i}]/td[10]`
		);
		let value = await page.evaluate((el) => el.textContent, percent[0]);
		let name = await page.evaluate((el) => el.textContent, sub[0]);
		obj[name] = value;
	}
	await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');

	for (let i = 3; i < 15; i++) {
		let sub = await page.$x(
			`/html/body/form/div[4]/div[3]/div/table/tbody/tr[${i}]/td[2]`
		);
		let percent = await page.$x(
			`/html/body/form/div[4]/div[3]/div/table/tbody/tr[${i}]/td[10]`
		);
		let value = await page.evaluate((el) => el.textContent, percent[0]);
		let name = await page.evaluate((el) => el.textContent, sub[0]);
		obj[name] = value;
	}

	console.table(obj);

	await browser.close();

	//TODO: Sending attendence details via e-mail
	mailOptions.subject = 'Attendence Summary';
	mailOptions.html = '<img src="cid:unique@kreata.ee"/>';
	mailOptions.attachments[0].filename = `${date}.png `;
	mailOptions.attachments[0].path = `./Attendence/${date}.png`;
	mailOptions.attachments[0].cid = 'unique@kreata.ee';
	mailOptions.attachments[1].filename = `${date}.png`;
	mailOptions.attachments[1].path = `./Attendence/${date}.png`;
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
})();
