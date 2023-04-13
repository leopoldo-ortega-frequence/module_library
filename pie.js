export class PieChart extends HTMLElement {
  _data = [];
  width = 0;
  height = 0;
  colors = null;

  constructor() {
    super();
    this.width = this.getAttribute('width') || 300;
    this.height = this.getAttribute('height') || 300;
    this.colors = d3.schemeCategory10;
    this.attachShadow({ mode: 'open' });
    //console.log('hello');
    this.render();
  }

  set data(value) {
    this._data = value;
    this.render();
  }

  renderChart() {
    const radius = Math.min(this.width, this.height) / 2;
    const svg = d3
      .select(this.shadowRoot.querySelector('.chart'))
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);
    const chart = svg
      .append('g')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`);

    const pie = d3.pie().value((d) => d.value);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const data = pie(this._data);

    const slices = chart
      .selectAll('path.slice')
      .data(data)
      .enter()
      .append('path')
      .attr('class', 'slice')
      .attr('d', arc)
      .attr('fill', (d, i) => this.colors[i % this.colors.length]);

    // const legend = svg
    //   .append('g')
    //   .attr('class', 'legend')
    //   .attr(
    //     'transform',
    //     `translate(${this.width - radius * 2}, ${radius * 2})`
    //   );

    // const legendItems = legend
    //   .selectAll('.legend-item')
    //   .data(data)
    //   .enter()
    //   .append('g')
    //   .attr('class', 'legend-item')
    //   .attr('transform', (d, i) => `translate(0, ${i * 20})`);

    // legendItems
    //   .append('rect')
    //   .attr('width', 15)
    //   .attr('height', 15)
    //   .attr('fill', (d, i) => this.colors[i % this.colors.length]);

    // legendItems
    //   .append('text')
    //   .text((d) => d.data.label)
    //   .attr('x', 20)
    //   .attr('y', 12);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
      .chart {
        display: inline
      }
      </style>
      <div class="chart"></div>
    `;

    this.renderChart();
  }
}

customElements.define('module-pie', PieChart);
