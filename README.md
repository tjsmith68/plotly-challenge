# plotly-challenge
Repository for Plotly Homework

This repository contains the code for the GT Data Analytics 24 week Bootcamp plotly homework.
The following are the key folders and their associated files:

Folders:

    <Main>      Contains:

                    index.html      This file contains the main HTML code that provides the 
                                    template and containers for the various plotly objects
                                    that are produced in javascript.

    /static/js  Contains:

                    app.js          This file contains all the javascript code for producing
                                    the various plotly objects. It also uses D3 to dynamically
                                    modify from contents of certain containers, such as the 
                                    sample drop down menu and the demographics panel of the
                                    selected sample. 

                    samples.js      The original data for this project was in a file named
                                    samples.json. However, attempts to read this with D3 caused
                                    an error. I created an alternate file with the same data 
                                    assigned to a variable and inported it via a script tag
                                    in the HTML code. 