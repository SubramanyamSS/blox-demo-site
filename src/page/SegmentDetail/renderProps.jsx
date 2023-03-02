/* global d3, self */
import $ from 'jquery';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import { Button, Form, Modal, Icon, Table, Image } from 'semantic-ui-react';
import {
  SliderSection,
  SliderWrapper
} from './styled';
import { isEmpty } from './../../common';

const ConfigModal = ({ showConfig, closeConfig, data, saveConfig, segment }) => {
  const [formData, updateData] = useState({
    getTag: data.getTag || '',
    apiKey: data.apiKey || '',
    putTag: data.putTag || ''
  });

  const listenChange = (key, value) => {
    formData[key] = value;
    updateData({...formData});
  };

  return (
    <Modal
      size={'small'}
      open={showConfig}
      onClose={closeConfig}
      closeOnDimmerClick={false}
    >
      <Modal.Header>API Configuration</Modal.Header>
      <Modal.Content>
        <Form onSubmit={() => saveConfig(formData)}>
          <Form.Field>
            <label>Get tag end-point</label>
            <input
              value={formData.getTag}
              placeholder='Get tag end-point'
              onChange={evt => listenChange('getTag', evt.target.value)}
            />
          </Form.Field>
          {segment === 'image moderation/image guidelines' &&
            <Form.Field>
              <label>Put tag end-point</label>
              <input
                value={formData.putTag}
                placeholder='Put tag end-point'
                onChange={evt => listenChange('putTag', evt.target.value)}
              />
            </Form.Field>
          }
          <Form.Field>
            <label>API key</label>
            <input
              placeholder='API key'
              value={formData.apiKey}
              onChange={evt => listenChange('apiKey', evt.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => saveConfig(formData)}>
          Save
        </Button>
        <Button onClick={closeConfig}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

ConfigModal.propTypes = {
  segment: PropTypes.string,
  showConfig: PropTypes.bool,
  data: PropTypes.shape().isRequired,
  saveConfig: PropTypes.func.isRequired,
  closeConfig: PropTypes.func.isRequired
};

const Grid = ({ imgResponse }) => (
  <Table singleLine>
    <Table.Header style={{ display: 'none' }}>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Tags</Table.HeaderCell>
        <Table.HeaderCell>Accuracy</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {imgResponse && Object.keys(imgResponse).map(tag => (
        <Table.Row
          key={tag}
          style={{
            display: imgResponse[tag].show ? '' : 'none'
          }}
        >
          <Table.Cell>
            {tag}
          </Table.Cell>
          <Table.Cell>
            {imgResponse[tag].list.map(obj => (
              <div key={Math.random()}>{obj.value || obj}</div>
              ))
            }
          </Table.Cell>
          <Table.Cell>
            {imgResponse[tag].list.map(obj => (
              <div key={Math.random()}>
                {`${parseFloat((obj.confidence || obj) * 100).toFixed(0)}%`}
              </div>
              ))
            }
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

Grid.propTypes = {
  imgResponse: PropTypes.shape().isRequired
};

let outerUpdate = null;
let outerCenterNode = null;
const HierarchyGraph = ({ treeData, showGraph, closeGraph }) => {

  useEffect(() => {
    if (showGraph) {
      initializeGraph();
    }
  }, [showGraph]);

  const clearAll = d => {
    d.class = '';
    if (d.children) {
      d.children.forEach(clearAll);
    } else if (d._children) {
      d._children.forEach(clearAll);
    }
  };

  const expandAll = d => {
    if (d._children) {
      d.children = d._children;
      d.children.forEach(expandAll);
      d._children = null;
    } else if (d.children) {
      d.children.forEach(expandAll);
    }
  };

  const collapseAllNotFound = d => {
    if (d.children) {
      if (d.class !== 'found') {
        d._children = d.children;
        d._children.forEach(collapseAllNotFound);
        d.children = null;
      } else {
        d.children.forEach(collapseAllNotFound);
      }
    }
  };

  const centerSearchTarget = d => {
    if (d.search_target) {
      outerCenterNode(d);
      console.log(`Found search target: ${d.name}`);
    }
    if (d.children) {
      d.children.forEach(centerSearchTarget);
    }
  };

  const searchTree = (d, first_call = false) => {
    if (d.children) {
      d.children.forEach(searchTree);
    } else if (d._children) {
      d._children.forEach(searchTree);
    }
    const searchFieldValue = eval('d.name');
    if (!isEmpty(searchFieldValue)) {
      if (first_call) {
        d.search_target = true;
      } else {
        d.search_target = false;
      }
      // Walk parent chain
      let parent = d;
      const ancestors = [];
      while (typeof(parent) !== 'undefined') {
        ancestors.push(parent);
        parent.class = 'found';
        parent = parent.parent;
      }
    }
  };

  const initializeGraph = () => {
    // ************** Generate the tree diagram  *****************
    const margin = { top: 40, right: 120, bottom: 20, left: 120 };
    const width = 960 - margin.right - margin.left;
    const height = 500 - margin.top - margin.bottom;
    // const { treeData, selectedImage } = this.state;

    let index = 0;
    const duration = 750;
    const root = JSON.parse(JSON.stringify(treeData));
    root.x0 = height / 2;
    root.y0 = 0;

    const tree = d3.layout.tree().nodeSize([ 95 , 0 ]).separation((a, b) => (a.parent === b.parent ? 1 : 1.25));

    const diagonal = d3.svg.diagonal().projection(d => ([d.x, d.y]));
    // Removing existing DOM content
    d3.select('#graph').selectAll('*').remove();

    // Define the zoom function for the zoomable tree
    function zoom() {
      d3.select('g').attr('transform', `translate(${d3.event.translate})scale(${d3.event.scale})`);
    }

    // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
    const zoomListener = d3.behavior.zoom().scaleExtent([0.1, 4]).on('zoom', zoom);

    const svg = d3.select('#graph').append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('overflow', 'auto')
      .call(zoomListener)
      .append('g')
      .attr('transform', `translate(${margin.left + 150}, ${margin.top})`);

    /* eslint-disable-next-line no-restricted-globals */
    d3.select(self.frameElement).style('height', '500px');

    const centerNode = source => {
      const scale = zoomListener.scale();
      let x = -source.x0;
      let y = -source.y0;
      x = x * scale + ($('#graph').width()) / 2;
      y = y * scale + ($('#graph').height()) / 2;
      d3.select('g').transition()
        .duration(duration)
        .attr('transform', `translate(${x}, ${y}) scale(${scale})`);
      zoomListener.scale(scale);
      zoomListener.translate([x, y]);
    };

    outerCenterNode = centerNode;

    function collapseLevel(d) {
      if (d.children) {
        if (d.depth > 0) {
          d._children = d.children;
          d._children.forEach(collapseLevel);
          d.children = null;
        } else {
          d.children.forEach(collapseLevel);
        }
      }
    }

    // Toggle children function
    function toggleChildren(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else if (d._children) {
        d.children = d._children;
        d._children = null;
      }
      return d;
    }

    // Compute the new tree layout.
    const _nodes = tree.nodes(root).reverse();
    _nodes.forEach(d => { d.y = d.depth * 120; });

    // if (root && root.children) {

      // root.children.forEach(collapseLevel);
    // }

    // Toggle children on click.
    /**
     * { function_description }
     *
     * @param      {<type>}  d       { parameter_description }
     */
    const click = d => {
      // this.updateActiveTags(this.state.selectedImage.url);
      // this.getTag(d);
      // // this.getTag(JSON.parse(JSON.stringify(d)));
      // if (d.children) {
      //   d._children = d.children;
      //   d.children = null;
      // } else {
      //   d.children = d._children;
      //   d._children = null;
      // }
      if (d3.event.defaultPrevented) return; // click suppressed
      d = toggleChildren(d);
      update(d);
      centerNode(d);
    };

    const dotme = text => {
      text.each(function() {
        var text = d3.select(this);
        const label = text.text();
        const wordLength = label.length;
        if (wordLength > 15) {
          text.text('').append('tspan').attr('class', 'elip').text(`${label.slice(0, 13)}...`);
        }
        // const words = text.text().split(/\s+/);
        // if (words.length > 1 && wordLength > 15) {
        //   const ellipsis = text.text('').append('tspan').attr('class', 'elip').text('...');
        //   const width = parseFloat(Math.ceil(text.attr('width'))) - Math.ceil(ellipsis.node().getComputedTextLength());
        //   const numWords = words.length;
        //   const tspan = text.insert('tspan', ':first-child').text(words.join(' '));
        //   // Try the whole line
        //   // While it's too long, and we have words left, keep removing words
        //   while (Math.ceil(tspan.node().getComputedTextLength()) > width && !isEmpty(words.length)) {
        //     words.pop();
        //     tspan.text(words.join(' '));
        //   }
        //   if (words.length === numWords) {
        //     ellipsis.remove();
        //   }
        // } else if (words.length === 1 && wordLength > 12) {
        //   text.text('').append('tspan').attr('class', 'elip').text(`${label.slice(0, 12)}...`);
        // }
      });
    };

    // Define the div for the tooltip
    var div = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    /**
     * Updates the given source.
     *
     * @param      {<type>}  source  The source
     */
    const update = source => {
      // Compute the new tree layout.
      const nodes = tree.nodes(root).reverse();
      const links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(d => { d.y = d.depth * 120; });

      // Declare the nodes…
      const node = svg.selectAll('g.node').data(nodes, d => (d.id || (d.id = ++index)));

      // Enter the nodes.
      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => (`translate(${d.x}, ${d.y})`))
        .on('click', click);

      nodeEnter.append('circle')
        .attr('r', 10)
        .attr('id', d => (`node-${d.id}`))
        .style('fill', d => (d._children ? 'lightsteelblue' : '#fff'));

      nodeEnter.append('text')
        .attr('y', d => (d.children || d._children ? ((18 + 4) * -1) : (18 + 4)))
        .attr('dy', '.35em')
        .attr('width', 95)
        .attr('class', 'dotme')
        .attr('text-anchor', 'middle')
        .text(d => (d.name))
        .style('fill-opacity', 1)
        .on('mouseover', d => {
          div.transition()
            .duration(200)
            .style('opacity', .9);
          div.html(d.name)
            .style('width', '150px')
            .style('display', `${d.name.length > 15 ? '' : 'none'}`)
            .style('height', 'auto')
            .style('overflow-wrap', 'break-word')
            .style('left', `${(d3.event.pageX)}px`)
            .style('top', `${(d3.event.pageY - 28)}px`);
          })
        .on('mouseout', d => {
          div.transition()
            .duration(500)
            .style('opacity', 0);
        });

      d3.selectAll('.dotme').call(dotme);

      // Transition nodes to their new position.
      const nodeUpdate = node.transition()
        .duration(duration)
        .attr('transform', d => (`translate(${d.x}, ${d.y})`));

      nodeUpdate.select('circle')
        .attr('r', 10)
        .style('fill', d => (d._children ? 'lightsteelblue' : '#fff'));

      nodeUpdate.select('text')
        .attr('text-anchor', d => (d.children ? 'end' : 'start'))
        .attr('y', d => (d.children ? '-25' : '25'))
        .attr('x', d => (d.children ? '25' : '-25'))
        .style('fill-opacity', 1);

      // Transition exiting nodes to the parent's new position.
      const nodeExit = node.exit().transition()
        .duration(duration)
        .attr('transform', d => (`translate(${source.x}, ${source.y})`))
        .remove();

      nodeExit.select('circle').style('display', 'none').attr('r', 10);

      nodeExit.select('text').style('display', 'none').style('fill-opacity', 1);

      // Declare the links…
      const link = svg.selectAll('path.link').data(links, d => (d.target.id));

      // Enter any new links at the parent's previous position.
      link.enter().insert('path', 'g')
        .attr('class', 'link')
        // .style('stroke', '#251a3e')
        .attr('d', d => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal({ source: o, target: o });
        });

      // Transition links to their new position.
      link.transition()
        .duration(duration)
        .attr('d', diagonal)
        .style('stroke', d => {
        if (d.target.class === 'found') {
          return '#2E8B57'; // seagreen
        }
      });;

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
        .duration(duration)
        .style('display', 'none')
        .attr('d', d => {
          const o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        })
        .remove();

      // Stash the old positions for transition.
      nodes.forEach(d => {
        d.x0 = d.x;
        d.y0 = d.y;
        // Adjust content div height based on the svg height
      });
      // this.adjustHeight();
    };

    // outerUpdate = update;

    update(root);
  };

  return (
    <Modal
      size={'large'}
      open={showGraph}
      onClose={closeGraph}
      closeOnDimmerClick={false}
    >
      <Modal.Header>Hierarchy</Modal.Header>
      <Modal.Content>
        <div id="graph" />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={closeGraph}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

HierarchyGraph.propTypes = {
  showGraph: PropTypes.bool,
  treeData: PropTypes.shape().isRequired,
  closeGraph: PropTypes.func.isRequired
};

const ImageSlider = props => {
  const settings = {
    speed: 500,
    dots: false,
    infinite: false,
    adaptiveHeight: true,
    slidesToShow: props.slidesToShow,
    slidesToScroll: props.slidesToShow
  };

  return (
    <SliderWrapper>
      <Slider {...settings}>
        {props.images.map(image => (
          <SliderSection key={image.id}>
            <Image
              rounded
              size='small'
              src={image.url}
              onClick={() => props.selectImage(image)}
              alt='https://vuex.vue.ai/assets/icons/illustration_login.svg'
            />
          </SliderSection>
        ))}
      </Slider>
    </SliderWrapper>
  );
}

ImageSlider.propTypes = {
  images: PropTypes.array,
  selectImage: PropTypes.func,
  slidesToShow: PropTypes.number
};

ImageSlider.defaultProps = {
  images: [],
  slidesToShow: 5,
  selectImage: null
};

export { ConfigModal, Grid, HierarchyGraph, ImageSlider };