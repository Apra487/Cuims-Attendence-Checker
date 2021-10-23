# Cuims-Attendence-Checker
A ```nodejs``` script that automatically logs into [CUIMS](https://uims.cuchd.in/uims/) and notifies your current attendence via email .

_**I build this tool STRICTLY for EDUCATIONAL PURPOSES and for FUN and I am NOT RESPONSIBLE for any non-disciplinary action commited by its users**_

## Installation 🚀

To use this program, we need to perform this installatiion process once

-   Clone or download this repo.

```bash
git clone https://github.com/Apra487/Cuims-Attendence-Checker.git
cd Cuims-Attendence-Checker
```
-   Download and install [Node.js](https://nodejs.org/en/)
-   Create a new email account preferably gmail.
-   Go to : https://www.google.com/settings/security/lesssecureapps
-   Set the **Access for less secure apps** setting to **Enable**
-   Create a `.env` file in the root of your project and insert your credentials as key/value pairs in the following format of `KEY=VALUE`:

```sh
UID=19bcs1234
PASSWORD=g@PXRT9ZUW6V23AhS
OWNER_EMAIL=owner@gmail.com
OWNER_EMAIL_PASSWORD=Ownerspassword
RECIEVER_EMAIL=receiver@gmail.com
```
## Scheduling 🚀

To schedule the task we can use different techniques depending upon Operating System.<br>

* **macOS** <br>
 I am using ```Launchd```, a tool for running daemons and agents on macOS for scheduling my task.
 
* **linux**<br>
We can use ```Cron``` to schedule our task.

* **windows**<br>
We can use **Task Scheduler** to schedule our task.

<br>

👇 **_Please read the following Frequently Asked Questions (FAQ) carefully if you face any problem_** 👇
## FAQ

### Q1: How to setup daemon or agents for launchd to schedule the task?
**A:** I have shared my Launchd daemon plist file with this repo ```com.schedule-cuims.daemon.plist```. But for detail guide you can visit this awesome [Medium](https://medium.com/better-programming/schedule-node-js-scripts-on-your-mac-with-launchd-a7fca82fbf02) article.

### Q2: Is there any alternate ways other than launchd to schedule our task?
**A:** Yes, you can use ```Cron``` alternatively to schedule your task. Detailed guide can be found in this [Medium](https://medium.com/@gattermeier/cronjobs-for-your-node-js-apps-on-macos-20d129b42c0e) article.

### Q3: I am having problems in setting up windows task schedular to schedule my task
**A:** A detailed guide can be found [here](https://joshuatz.com/posts/2020/using-windows-task-scheduler-to-automate-nodejs-scripts/).











