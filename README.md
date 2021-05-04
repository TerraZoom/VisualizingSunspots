# Final Project

For this final project, I examine the charting of sunspot numbers comparing the usual visualizations of line charts which because of the compressed nature of the x-axis don’t clearly show any cyclical activity except for the well-known 11-year solar cycle. Radial charts, conversely, are well suited to expose other cyclical data. By visualizing individual years, using sunspot number data from the National Solar Observatory between 1945-2017 (1), radial visualizations of sunspot numbers appear to show an underlying cycle.


## Deliverables
Website: https://atlas.terrazoom.com/infoViz/final<br />
Video: <br />
Writeup (PDF) - https://atlas.terrazoom.com/infoViz/final/JohnWilliams-FinalProject-INFO5602.pdf<br />
GitHub: https://github.com/INFO-4602-5602/final-project-TerraZoom <br />


## Write-Up
You should approach the write-up like a research paper. It should contain the following sections:

* A 1-paragraph abstract that summarizes your motivating problem, what you did, and what you found.
* An introduction that describes the motivating problem and why it's interesting or important.
* A related work section that summarizes research related to your project (minimum eight citations).
* A detailed description of your project and justifications for any design elements.
* A discussion of what you found.

The write-up should be submitted as a PDF with a minimum of two pages (including figures and references) using the IEEE VIS Poster Format: <a href="http://junctionpublishing.org/vgtc/Tasks/camera.html">http://junctionpublishing.org/vgtc/Tasks/camera.html</a>

ABSTRACT
In this paper, I examine the charting of sunspot numbers comparing the usual visualizations of line charts which because of the compressed nature of the x-axis don’t clearly show any cyclical activity except for the well-known 11-year solar cycle. Radial charts, conversely, are well suited to expose other cyclical data. By visualizing individual years, using sunspot number data from the National Solar Observatory between 1945-2017 (1), radial visualizations of sunspot numbers appear to show an underlying cycle.

Keywords: Sunspots, visualization, solar science, Javascript, d3.js, web-visualization,
Index Terms: Human-centered computing—Visualization—Visualization techniques—Radial charts—Scientific visualization

1	INTRODUCTION
Historical records from China document the first sighting of sunspots in about 800 B.C. (3)(4) Sporadic measurements and observations of sunspots continued as court astrologers in China and Korea believed the blemishes on the Sun foretold of important events. Theophrastus, an ancient Greek scholar who was a student of Plato and Aristotle, mentioned sunspots around 300 B.C. John Worchester, an English monk, made the first drawing of sunspots in December 1128.  

While Italian astronomer Galileo Galilei(5) is generally credited for first viewing sunspots in 1610, English mathematician Thomas Harriot also observed sunspots with a telescope. Their observations were unknown to each other. Johannes Fabricius(2) was the first to publish a treatise about sunspots in 1611.

Sunspots are dark areas of cooler gas within the photosphere of the Sun’s atmosphere. Sunspots are temporary phenomena lasting from just a few days to several months. They expand and contract as they move across the Sun’s surface. The phenomena are caused when magnetic fields inhibit the convection of hot gasses and plasma. Sunspots occur at any size but many of the largest could easily fit the Earth.

In the early 1800s, astronomers such as Heinrich Schwabe and Rudolf Wolf, found that sunspot numbers rose and fell periodically, in a cycle lasting about 11 years. This cycle also corresponded with an increase and decrease in geomagnetic storms on Earth offering the first hint that the Sun acted as a giant magnet. It was not until the work of George Ellery Hale in 1908 photographed the Zeeman effect, a method that can show the presence of a magnetic field, in a sunspot spectrum that added this fact to the field of solar astronomy.


2	THEORY
Sunspot numbers are calculated by summing the number of individual sunspots and ten times that number for groups. It is a general indication of the Sun’s activity. The counting of sunspots is still done by hand by viewers around the world. Two “official” sunspot numbers exist. One, the International Sunspot Number, is compiled by the Solar Influences Data Analysis Center in Belgium. The NOAA sunspot number is compiled by the US National Oceanic and Atmospheric Administration.

To show a possible cyclical frequency pattern to the data, I used a mathematical formula known as Fast Fourier Transform (FFT) to find the main cyclical frequency to the sunspot number data; presumably the 11-year solar cycle, and also to see if other, lesser, frequencies showed at different time periods in the data. 	(1)


2.1	Line Chart Visualization of Sunspot Numbers
The visualization of the daily sunspot numbers is generally shown as a line chart. The chart clearly shows the Sun’s 11-year cycle whether the period is just a few decades or a couple of centuries. The chart easily gives a viewer a feel for the regular drumbeat of the Sun’s rhythm.

To create these visualizations, I used D3.js. D3 is a popular javascript library for creating visualizations. The original idea was to create a interactive dashboard containing both radial and line chart elements. A slider allows the user to choose a year, configured within the extents of the dataset. Once a year is chosen, the data is filtered within that extent and displayed. I created a basic line chart to verify that the data was performing as expected. Since it showed the regular waxing and waning of the solar cycle, I moved on to displaying a radial chart.


Figure 1:	Sunspot numbers charted monthly between 1750 and 2010.

Figure 2:	Sunspot numbers charted daily between 1945 and 2017.


2.2	Radial Chart Visualization of Sunspot Numbers
Radial charts are considered less effective in showing information and can skew perception (6)(7) but can be used to visually show readers cycles that might be lost in line chart or scatterplot data. The following charts produced using D3.js show individual years. They both appear to show cyclical rise and fall in the number of sunspots.


Figure 3:	Sunspot numbers charted daily in 1945.

Figure 4:	Sunspot numbers charted daily in 2011.


Getting the chart to display in a radial fashion was not difficult but controlling the chart using a slider was time consuming. The first step was to create a readable slider. D3.js comes with some slider properties but the resulting slider is very small and hard to use. It creates a bad user experience. Since D3 can be controlled via CSS, I added styles to enlarge the slider control and styled the slider itself. The data itself contains daily dates and sunspot numbers. I created a function using the parseDate functions to only deliver years so that could be displayed on the slider. One frustration might be that the slider seems continuous. And indeed it is, It is moving through all 365 days of the year. A better user experience would be if it “clicked” into place by year instead of relying on the days.

Once the slider was in place, I set about creating functions to update the chart with just the sunspot numbers of the year. That required some refactoring of code. And initial attempts resulted in nothing at first then I was able to move through the years but the elements stacked on top of each other. The elements were not clearing once drawn. This layering creates an interesting effect but is not very useful.


Figure 5:	Elements stacked on top of one another in this iteration of the chart.


Stumbling across a design pattern relating to the enter(), update, and exit() functions helped greatly. In short, I created a initialize function that called an updateChart() function. A separate function filtered the data and was called on mouseover. The filtered data was sent to the updateChart function and the chart rendered. The breakthrough occurred when I added remove(element) at the beginning of the updateChart function. This essentially removes the chart element and is replaced a few lines later with updated chart data.

This is one reason why no data appears initially. I was unable to affect that change for the final artifact. I then added rings corresponding to the number of sunspots. Labelling those proved to be more difficult than expected. And borrowing some code from the D3 gallery, I was able to create spokes for the corresponding months and create the labels at the inner radius location.

Another deficiency is noticeable if you rollover the sunspot spokes. Making the spokes change to a red color for more inspection proved a simple CSS style change on mouseover. But getting a tooltip to show with the data of date and sunspot number did not work as expected. If you open the console, you can see that the correct data is outputting on mouseover. I just was unable to translate that visually.


3	USING THE FFT FORMULA TO FIND UNDERLYING CYCLES
Because a cycle appears to show in the radial chart, I wanted to know whether that cycle actually appears in the data. This has been a philosophical question since first casting the data into the radial chart. Using the Fast Fourier Transform algorithms in a python Jupyter notebook, I was able to explore the cyclical frequencies within the sunspot number data. When using the entire dataset, the 11-year solar cycle shows prominently. In the plotting another peak, showing a different cyclical frequency, appears at about 13 times per year. That translates into about every 28 days which closely matches the solar rotation.

Figure 6:	FFT plot in Jupyter notebooks showing frequency of 11-year solar cycle.

Figure 7:	Similar FFT plot but taking closer look at the second cyclical frequency in sunspot number data. An event that takes place about 13 times a year or every 28 days. This closely matches with the Sun’s rotational period.


4	CONCLUSION
The radial chart does take a moment to load. More than 26,000 days are a part of the dataset. Also drawing the labels and ticks seems to take more time because of the cartesian geometry. I’m not sure if this can be improved.

The radial charting of sunspot numbers appears to the eye to have a regularity. By using the Fast Fourier Transformation algorithm, not only does the 11-year solar cycle show but also a shorter interval cycle closely tied to the solar rotation of 28 days. By showing the data in the radial chart format, in a single year, a pattern emerges that is not easily seen within the more traditional line chart.



## References
Below are all the sources and resources used to benefit this project. It's a big list. I needed the help and the background information will make my job at the solar observatory easier.

[1]	National Solar Observatory - Historical Archive - https://nso.edu/data/historical-archive/ & https://www.dropbox.com/sh/6j8g7uc4l2uofm4/AADbblHaEQqhpJOUAgfHfN9Ea?dl=0
[2]	NASA- https://www.nasa.gov/mission_pages/sunearth/news/400yrs-spots.html
[3]	Arlt, R., Vaquero, J.M. Historical sunspot records. Living Rev Sol Phys 17, 1 (2020). https://doi.org/10.1007/s41116-020-0023-y
[4]	Zhentao, Xu. "Solar Observations in Ancient China and Solar Variability." Philosophical Transactions of the Royal Society of London. Series A, Mathematical and Physical Sciences 330, no. 1615 (1990): 513-15. http://www.jstor.org/stable/53600.
[5]	Galileo's Sunspot Letters - https://www.bl.uk/collection-items/galileos-sunspot-letters#
[6]	M. Waldner, A. Diehl, D. Gračanin, R. Splechtna, C. Delrieux and K. Matković, "A Comparison of Radial and Linear Charts for Visualizing Daily Patterns," in IEEE Transactions on Visualization and Computer Graphics, vol. 26, no. 1, pp. 1033-1042, Jan. 2020, doi: 10.1109/TVCG.2019.2934784.
[7]	Burch, Michael & Weiskopf, D.. (2014). On the benefits and drawbacks of radial diagrams. 10.1007/978-1-4614-7485-2_17.
[8]	Data Visualization with D3.js The Easy Way - Udemy.com - https://www.udemy.com/course/data-visualize-data-with-d3js-the-easy-way/learn/lecture/1848412#overview
[9]	http://sidc.oma.be/silso/datafiles
[10]	http://www.scielo.org.za/scielo.php?script=sci_arttext&pid=S0038-23532014000100014
[11]	https://scied.ucar.edu/learning-zone/sun-space-weather/sunspot-cycle
[12]	National Solar Observatory - Historical Archive - https://nso.edu/data/historical-archive/
[13]	https://www.dropbox.com/sh/6j8g7uc4l2uofm4/AADbblHaEQqhpJOUAgfHfN9Ea?dl=0
[14]	https://solarscience.msfc.nasa.gov/SunspotCycle.shtml
[15]	https://en.wikipedia.org/wiki/Fast_Fourier_transformus
[16]	D3.js 4.x Data Visualization - Third Edition by Swizec Teller; Ændrew Rininsland Published by Packt Publishing, 2017 - Bonus Chart! Sunburst radial partition joy! - https://learning.oreilly.com/library/view/d3js-4x-data/9781787120358/2d190604-1193-4e38-9c06-74685b3d4c4e.xhtml (login required)
[17]	https://github.com/Olical/react-faux-dom/issues/29
[18]	https://medium.com/@louisemoxy/a-simple-way-to-make-d3-js-charts-svgs-responsive-7afb04bc2e4b
[19]	https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart
[20]	https://bl.ocks.org/d3noob/2b6c6081830c83af7478ec89cbde755c
[21]	https://www.freecodecamp.org/news/how-to-work-with-d3-jss-general-update-pattern-8adce8d55418/
[22]	https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518
[23]	https://www.d3-graph-gallery.com/graph/interactivity_brush.html#brushingforzoom
[24]	https://www.d3-graph-gallery.com/graph/density_slider.html
[25]	https://bl.ocks.org/officeofjane/9b9e606e9876e34385cc4aeab188ed73 - most helpful
[26]	https://bl.ocks.org/tomshanley/3c49d036610853d380e3fcaf8d3f0b89
[27]	https://observablehq.com/@d3/radial-area-chart
[28]	https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
[29]	https://julialedur.com.br/radial-charts-in-d3
[30]	https://julialedur.github.io/d3-radial-charts/
[31]	https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/polar-radial-bar
[32]	https://embed.plnkr.co/vIwzn3piaBSqTfmVxrKt/?show=preview
[33]	https://www.d3-graph-gallery.com/graph/circular_barplot_basic.html
[34]	https://blockbuilder.org/bricedev/8aaef92e64007f882267
[35]	https://www.youtube.com/watch?v=3_eTqLXNaWo
[36]	https://www.d3-graph-gallery.com/graph/circular_barplot_label.html
[37]	https://bl.ocks.org/bricedev/8aaef92e64007f882267
[38]	https://stackoverflow.com/questions/16260285/d3-removing-elements
[39]	http://bl.ocks.org/sathomas/9c63c53f679b7a822831
[40]	https://bl.ocks.org/larsenmtl/e3b8b7c2ca4787f77d78f58d41c3da91
[41]	https://observablehq.com/@d3/zoomable-sunburst
[42]	D3 API Reference - https://github.com/d3/d3/blob/master/API.md#interpolators-d3-interpolate
[43]	https://jesperkiledal.com/blog/d3-axis-tips-and-tricks/
[44]	http://bl.ocks.org/nbremer/6506614
[45]	https://observablehq.com/@d3/d3v6-migration-guide#events
[46]	Simple d3.js tooltips - https://d19jftygre6gh0.cloudfront.net/d3noob/a22c42db65eb00d4e369
[47]	d3-selection - https://github.com/d3/d3-selection/blob/v1.4.1/README.md#event
[48]	d3.event.page.X & d3.mouse(this)[0] - https://github.com/d3/d3-selection/blob/v1.4.1/README.md#event
[49]	Mulitple Line Graph in v6 - https://bl.ocks.org/d3noob/ed0864ef6ec6af1e360917c29f4b08da
[50]	D3 Line Chart @Observable - https://observablehq.com/@d3/line-chart
[51]	D3 JSON data tutorial - https://www.dashingd3js.com/d3-tutorial/d3-json-data


## Submission
You've got everything


## Grade Breakdown
Proposal: 5 points

Artifact(s): 40 points

Write-Up: 40 points

Post-Mortem: 5 points

Showcase Video: 10 points
