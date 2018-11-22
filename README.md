## Grade Calculator
A tool that provides students to calculate their current overall grade for a current class with ease. With each class having a unique grading scale, students may have a difficult time calculating their grade if no tools are provided. That's where Grade Calculator comes in! This tool is meant to be user-friendly, so it's the go-to tool use when it comes to grade calculation. In order for it to look 'decent,' Grade Calculator was built entirely with React.js. 


Currently deployed at: https://gradecalculator.dannyhp.com


### To start development:
#### 1. Install npm and node.js.
#### 2. Run `npm install` in the project root.
#### 3. Run `npm start` in the project root. The project will be deployed to: `localhost:3000` by default.

## Known bugs:
Grade Calculator is still in its development phase, so there are many bugs within the application.
- Currently testing to identify more bugs (currently no fatal bugs).

## Future plans:
As you may have noticed, Grade Calculator is just a prototype. We plan to have the final version feature many more features.
- Notification bars instead of pop-up alerts.
- Deletion of categories.
- Deletion of certain assignments in each category.
- Adding more categories where it can exceed the weight of 100 (extra credit).
- Editing the score & max score of each assignment.
- Grading Calculator for different classes (interchangable grading scales).
- Saving and loading up your grades (continually updating them).

# Fixed bugs:
These are all bugs that have been identified and fixed within the application.
- Fixed responsiveness of the application.
  - You can now view the application on mobile.
  - Minimizing your screen will correctly format the cards of each category.
- Users were able to create a category and with a specific name and weight. Afterwards, if the user created another category with an empty name, the previous category's name and weight was used. Users cannot do this anymore (same issue with creating assignments (this was also fixed)).
