// Queue class
export default class Queue
{
    // Array is used to implement a Queue
    constructor()
    {
        this.items = [];
    }
                  
enqueue(element)
    {    
        // adding element to the queue
        this.items = [...this.items,element];
    }

dequeue()
    {
        // removing element from the queue
        // returns underflow when called 
        // on empty queue
        if(this.isEmpty())
            return "Underflow";
            
            return this.items.splice(0,1);
    }
    front()
    {
        // returns the Front element of 
        // the queue without removing it.
        if(this.isEmpty())
            return "No elements in Queue";
            
            return this.items[0];
    }
    isEmpty()
    {
        // return true if the queue is empty.
        return this.items.length === 0;
    }
    printQueue()
    {
        var str = "";
        for(var i = 0; i < this.items.length; i++)
            str += this.items[i] +" ";
       if(str==="")
            return "Queue is Empty";
        
            return str;
    }
}