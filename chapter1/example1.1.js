import { Graph, START, END } from "@langchain/langgraph";
// Define a simple function that serves as a langgraph node
const greetingNode = async (state) => {
  const name = state.name || "World";
  return { greeting: `Hello, ${name}!` };
};
// Create a new graph
const builder = new Graph();
// Add our single node to the graph
builder.addNode("greeting", greetingNode);
// Set the entry point
builder.addEdge(START,"greeting");
// Set the exit point (same as our only node)
builder.addEdge("greeting", END);
// Compile the graph
const graph = builder.compile();
// Execute the graph with some input
const result = await graph.invoke({ name: "LangGraph User" });
console.log(result);
// Should output: { greeting: 'Hello, LangGraph User!' }
// Run with different input
const result2 = await graph.invoke({ name: "James" });
console.log(result2);
// Should output: { greeting: 'Hello, James!' }


//Run this example within the project folder, for example in my case: 
//D:\Projects\langgraph-js-book> node chapter1/example1.1.js
//output:
//{ greeting: 'Hello, LangGraph User!' }
//{ greeting: 'Hello, James!' }