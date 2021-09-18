const drawHeatMap = (data) => {
  const graphWidth = 1300
  const graphHeight = 460
  const paddingBottom = 50
  const paddingLeft = 100
  const paddingRight = 50
  const paddingTop =50
  const circleRadius = 6
  const svg = d3.select('svg')
                .attr('width', graphWidth + paddingLeft + paddingRight)
                .attr('height', graphHeight + paddingBottom + paddingTop)


  const xScale = d3.scaleBand()
                   .domain(data.map(d => d.date))
                   .range([0, graphWidth])
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"]
  const yScale = d3.scaleBand()
                   .domain(monthNames)
                   .range([0, graphHeight])

  const xAxis = d3.axisBottom()
                  .scale(xScale)
                  .tickValues(xScale.domain().filter(d => d.getMonth() === 0 && d.getYear() % 10 === 0))
                  .tickFormat(d => d.getFullYear())
                  // .tickSize(0)

  const yAxis = d3.axisLeft()
                  .scale(yScale)
                  // .tickValues(monthNames)

  // const filters = ['no-doping', 'doping']
  // const colors = ['#ff7f0e', '#1f77b4']
  // const legends = ['No doping allegations', 'Riders with doping allegations']
  // const colorScale = d3.scaleOrdinal()
  //                      .domain(filters)
  //                      .range(colors)
  // const legendScale = d3.scaleOrdinal()
  //                      .domain(filters)
  //                      .range(legends)
  // const tooltip = d3.select('#tooltip')

  // const graph = svg.append('g')
  //                   .selectAll('circle.dot')
  //                   .data(data)
  //                   .join('circle')
  //                   .classed('dot', true)
  //                   .attr('cx', d => xScale(+d.Year))
  //                   .attr('cy', d => yScale(d.Date))
  //                   .attr('data-xvalue', d => d.Year)
  //                   .attr('data-yvalue', d => d.Date)
  //                   .attr('r', circleRadius)
  //                   .attr('stroke', '#000000')
  //                   .attr('stroke-width', 1)
  //                   .attr('fill', d => d.Doping ? colorScale('doping') : colorScale('no-doping'))
  //                   .on('mouseover', function(e, d) {
  //                     tooltip
  //                     .html(`
  //                       ${d.Name}: ${d.Nationality}
  //                       <br />
  //                       Year: ${d.Year}, Time: ${d.Time}
  //                       ${d.Doping ? `
  //                         <br />
  //                         <br />
  //                         ${d.Doping}
  //                       `: ``}
  //                     `)
  //                     .style('left', `${e.clientX + circleRadius}px`)
  //                     .style('top', () => {
  //                       const { height } = tooltip.node().getBoundingClientRect()
  //                       return `${e.clientY - height/2}px`
  //                     })
  //                     .attr('data-year', d.Year)
  //                     .style('opacity', '0.9')

  //                     d3.select(this).style('cursor', 'pointer')
  //                   })
  //                   .on('mouseout', function() {
  //                     tooltip.style('opacity', 0)
  //                            .style('left', 0)
  //                            .style('top', 0)
  //                   })

  svg.append('g')
     .attr('id', 'x-axis')
     .call(xAxis)
     .attr('transform', `translate(${paddingLeft}, ${graphHeight + paddingTop})`)
     .style('font-size', '0.8rem')

  svg.append('g')
     .attr('id', 'y-axis')
     .call(yAxis)
     .attr('transform', `translate(${paddingLeft}, ${paddingTop})`)
     .style('font-size', '0.8rem')

  // graph.attr('transform', `translate(${paddingLeft}, ${paddingTop})`)

  svg.append('text')
     .text('Months')
     .attr('transform', `translate(${paddingLeft/5}, ${graphHeight/2 + paddingTop})rotate(-90)`)
     .attr('text-anchor', 'middle')
     .style('font-size', '1.1rem')

  svg.append('text')
     .text('Years')
     .attr('transform', `translate(${graphWidth/2 + paddingLeft}, ${graphHeight + paddingTop + paddingBottom})`)
     .attr('text-anchor', 'middle')
     .style('font-size', '1.1rem')

}

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
  .then(resp => resp.json())
  .then(resp => {
    const monthlyVariance = resp.monthlyVariance.map(d => {
      return {...d, date: new Date(d.year, d.month-1, 1)}
    })
    drawHeatMap(monthlyVariance)
  })