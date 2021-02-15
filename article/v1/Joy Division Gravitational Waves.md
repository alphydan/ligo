# Joy Division^*^  Gravitational Waves

We can add pictures, equations, code, headings, tables, etc ...
**cheat sheet**: https://commonmark.org/help/ (or click on **?** above)

Short Intro Paragraph:  Scope of what we will present & explain

## The Graph
![](https://i.imgur.com/wG5US0O.jpg)

#### From neutron stars to black holes*
- quick background on the original JoyDiv plot, neutron stars, who made the plot + why
- Motive for making the graph - wanted to 'update' the icionic image with LIGO's groundbreaking gravitational waves detections

## Making the Graph



- what language & tools did we use and why? (first Python (jupyter notebooks), then JavaScript (p5.js) for final image)
- what database did we import the wave data from? (straight from LIGO)

### Importing csv files and plotting unfiltered data
- (and appending a couple of off catalogue but notable events). 
- By importing the csv file we could associate the event name with each GPS time.

We could then plot subsets of the noisy data for each imported wave.

#### Raw data:

list of events: https://www.gw-openscience.org/eventapi/html/GWTC-1-confident/
$32$ seconds of [strain data](https://www.gw-openscience.org/eventapi/html/GWTC-1-confident/GW170823/v1/) at $4$KHz, so $32 \times 4,000 = 128,000$ points. 

![Raw data from Ligo](https://i.imgur.com/Nqeh8lx.png)

#### Filtered data

![A wave after applying filters](https://i.imgur.com/5nNXeOb.png)

Produced using:

```python=
def plot_strain(event_index, full_event_list, strain_timeseries, delta_L, delta_R):
    '''
    plot a filtered strain timeseries, and constrain the x-axis
    :event_index int: chose event_index (a number between 0 and full_event_list)
    :full_event_list list: defined further up this notebook
    :strain_timeseries TimeSeries() object: from gwpy
    :delta_L float: how far left from the center of the event to plot 
       (max of 16, since the whole time series is 32s long, 
       can be negative to move right of center)
    :delta_R float: how far right from the center of the event to plot 
    '''
    ev = full_event_list[event_index]
    lab = ev[3]
    event_name = ev[1]
    time_stamp = ev[2]

    if lab =='H1':
        colour = 'gwpy:ligo-hanford'
    if lab == 'L1':
        colour = 'gwpy:ligo-livingston'
    if lab == 'V1':
        colour = 'green'

    from gwpy.plot import Plot
    plot = Plot(strain_timeseries, figsize=[16,2.5], color=colour )
    ax = plot.axes[0]
    ax.set_title(event_name + ' - ' + lab)
    ax.set_ylabel('Amplitude [strain]')
    ax.set_xlim(time_stamp - delta_L, time_stamp + delta_R)
    ax.set_xscale('seconds', epoch=time_stamp)
    return delta_L, delta_R

    plot.show()   

```

### Whitening & bandpassing
- (how did we change/experiment with different strategies of whitening?)
- We followed this tutorial as a starting point: https://gwpy.github.io/docs/stable/examples/signal/gw150914.html

### Selecting sections of interest

![](https://i.imgur.com/zJNDiGa.png)

Plots [like the above](https://www.gw-openscience.org/eventapi/html/GWTC-1-confident/GW170823/v1/) helped us inspect frequencies of interest and the approximate timing of the event.

From these approximate timings, we could manually experiment with and select the exact intervals where each graph's event occured. Once the event had been located and  positioned approximately in the center of its section, we could apply a crop to isolate the chosen interval and discard the noisy data on either side. The sections were then appended to the new Time Series ```the_interesting_data```.
- code that did the above

### Preparing data to plot
#### Subsampling
Because some of the interesting signals were longer in time than others, not all of our sections of interest had the same number of points. To allow us to plot all of the events on the same X-axis, some points needed to be cut from the longest sections of interest. We used a method of **subsampling**  to achieve this.
The lowest number of data points in any one of the events was 1200. Graphs with higher numbers of points (up to ~5000) were downsampled.
- code

#### Normalising Virgo events
We also scaled the selected Virgo events down to the size of the significantly smaller Hanford and Livingston ones.
- (maybe add image of un-normalised Virgo data? big spiky thing)

#### Development of Gaussian curve function
- (image of unadjusted bell curve function)
- description of lifting up the left side so only the right of the event was dampened
- (image of adjusted bell curve function)

### Final plot
- add runthrough of code, application of Gaussian curve, perspective effect, etc.

## What does the Graph show?




### The wave equation
### GR as a theory of metrics
### Einstein's GR Equation
### From GR to _metric waves_
$\square \cdot g_{\mu\nu} = 0$, yay waves in the metric!
### Measuring _metric waves_








How to add code:

```python
for x in range(t)
    print(x)
```
## References


#### Waves 
[Wave Equation - hyperphysics](http://hyperphysics.phy-astr.gsu.edu/hbase/Waves/waveq.html)
[Electromagnetic Wave Equation - hyperphysics](http://hyperphysics.phy-astr.gsu.edu/hbase/Waves/emwv.html)

#### General Relativity - Intuition
[General Relativity for Laypeople - a primer](https://www.markushanke.net/general-relativity-for-laypeople-a-first-primer/)
[The Equivalence principle & the deflection of light](https://www.einstein-online.info/en/spotlight/equivalence_light/)
[time dilation in GR](https://thecuriousastronomer.wordpress.com/2015/02/11/time-dilation-in-general-relativity/)
[What is space - nautil.us](http://nautil.us/issue/49/the-absurd/what-is-space)

#### General Relativity - full on!
[A no nonsense introduction to General Relativity - Sean Caroll](https://www.astro.caltech.edu/~george/ay21/readings/grtiny.pdf)
[Lecture notes on General Relativity - Sean Caroll](https://www.preposterousuniverse.com/grnotes/)
[Introduction to general relativity - H. Bl&ouml;te](http://wwwhome.lorentz.leidenuniv.nl/~henk/grh.pdf)
[Metric, curved space & General relavivity - Syksy Räsänen](https://www.mv.helsinki.fi/home/syrasane/cosmo/lect2018_02.pdf)
https://web.mit.edu/edbert/GR/gr1.pdf

#### Gravitational Waves - Intuition
[Studying the universe with gravitational waves](https://thecuriousastronomer.wordpress.com/2013/12/03/studying-the-universe-using-gravitational-waves/)
[Relativistic Astrophysics lecture - Wheeler (intuition + partial derivation)](http://www.physics.usu.edu/Wheeler/GenRel2013/Notes/GravitationalWaves.pdf)

#### Abridged derivations of gravitational waves
https://www.quora.com/What-is-the-wave-equation-of-gravitational-waves
https://www.pnas.org/content/pnas/113/42/11662.full.pdf

#### Detailed derivation of gravitational waves
https://arxiv.org/pdf/1005.4735.pdf
https://www.tat.physik.uni-tuebingen.de/~kokkotas/Teaching/NS.BH.GW_files/GW_Physics.pdf
https://www.ams.org/publications/journals/notices/201707/rnoti-p684.pdf





#### Metric Spaces
[Intro to metric spaces ](https://www.youtube.com/watch?v=6CLl5xx5X-Y)
https://mathworld.wolfram.com/MinkowskiMetric.html

<small> * **Disclaimer**:  We find deplorable the historical idea of `joy divisions` and what the album title `unknown pleasures` may suggest.[[1]](https://www.haaretz.com/jewish/.premium-how-joy-division-found-inspiration-in-auschwitz-1.5360552)</small>




