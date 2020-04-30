import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';
import * as cytoscape from 'cytoscape';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {

  @ViewChild('myGraph') myGraph: ElementRef;

  elements: any;
  cy: any;

  constructor(private graphService: GraphService) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.graphService.getGraph('').subscribe(
      (graph: any) => {
        this.elements = graph.elements;
        this.cy = cytoscape({
          elements: graph.elements,
          style: graph.style,
          layout: graph.layout,
          container: this.myGraph.nativeElement
        });
      }
    );
  }

}
