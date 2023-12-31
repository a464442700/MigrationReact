


import React, { useEffect } from 'react';
import G6 from '@antv/g6';

 const Tree:React.FC  = () => {
    useEffect(() => {

       const  data={
           "id": "Modeling Methods",
           "children": [
               {
                   "id": "Classification",
                   "children": [
                       {
                           "id": "Logistic regression"
                       },
                       {
                           "id": "Linear discriminant analysis"
                       }

                   ]
               }


           ]
       };
        const container = document.getElementById('container');
        // @ts-ignore
        const width = container.scrollWidth||500;
        // @ts-ignore
        const height = container.scrollHeight || 500;
        const graph = new G6.TreeGraph({
            container: 'container',
            width,
            height,
            modes: {
                default: [
                    {
                        type: 'collapse-expand',
                        onChange: function onChange(item, collapsed) {
                            // @ts-ignore
                            const data = item.getModel();
                            data.collapsed = collapsed;
                            return true;
                        },
                    },
                     'drag-canvas',
                  'zoom-canvas',
                ],
            },
            defaultNode: {
                size: 26,
                anchorPoints: [
                    [0, 0.5],
                    [1, 0.5],
                ],
            },
            defaultEdge: {
                type: 'cubic-horizontal',
            },
            layout: {
                type: 'compactBox',
                direction: 'LR',
                getId: function getId(d:any) {
                    return d.id;
                },
                getHeight: function getHeight() {
                    return 16;
                },
                getWidth: function getWidth() {
                    return 16;
                },
                getVGap: function getVGap() {
                    return 10;
                },
                getHGap: function getHGap() {
                    return 100;
                },
            },
        });

        graph.node(function (node) {
            return {
                label: node.id,
                labelCfg: {
                    offset: 5,
                    position: node.children && node.children.length > 0 ? 'left' : 'right',
                },
            };
        });

        graph.data(data);
        graph.render();
        graph.fitView();

        if (typeof window !== 'undefined')
            window.onresize = () => {
                if (!graph || graph.get('destroyed')) return;
                if (!container || !container.scrollWidth || !container.scrollHeight) return;
                graph.changeSize(container.scrollWidth, container.scrollHeight);
            };
    }, []);
    return <div id="container" ></div>;
};



export default Tree;
