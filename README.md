## Grade Calculator
A tool that enables students to calculate their current overall grade for a current class with ease. With each class having a unique grading scale, students may have a difficult time calculating their grade if no tools are provided. That's where Grade Calculator comes in! This tool is meant to be user-friendly, so it's the go-to tool use when it comes to your grade calculation. In order to keep up to today's technology, Grade Calculator was built entirely with React.js. 


Currently deployed at: https://gradecalculator.dannyhp.com
Public release date: TBA


### To start development:
#### 1. Install npm and node.js.
#### 2. Run `npm install` in the project root.
#### 3. Run `npm start` in the project root. The project will be deployed to: `localhost:3000` by default.

## Known bugs:
Grade Calculator is still in its development phase, so there are many bugs within the application.
- Currently testing to identify more bugs (currently no fatal bugs).

## Future plans:
As you may have noticed, Grade Calculator is just a prototype. We plan to have the final version feature many more features.
- Disabling certain assignments (where the grade from that assignment will not count).
- Adding more categories where it can exceed the weight of 100 (extra credit).

## Fixed bugs:
These are all bugs that have been identified and fixed within the application.
- Fixed responsiveness of the application.
  - You can now view the application on mobile.
  - Minimizing your screen will correctly format the cards of each category.
- Users were able to create a category and with a specific name and weight. Afterwards, if the user created another category with an empty name, the previous category's name and weight was used. Users cannot do this anymore (same issue with creating assignments (this was also fixed)).

## Grade Calculator Timeline
- November 21, 2018 - Application development started. Landing page was created and basic functionality was implemented. Prototype deployed to (https://grade-calculator.netlify.com).
- November 22, 2018 - Application became fully responsive to all screen sizes (including mobile). Development for assignment/category deletion and modification started.
- November 23, 2018 - Implemented the functionality for users to modify assignment details (you can change the assignment name, score or max score) for any assignment in any category. The grade calculation will continue to update!
- December 5, 2018 - Implemented ability to delete categories (this will delete all assignments inside). Implemented functionality for users to save their grades and load up their grades using Google's Firebase Realtime DB. You may also reset your grades (similar to refreshing the page).
- December 7, 2018 - All alerts() have been converted to notifications (more asthetics).
