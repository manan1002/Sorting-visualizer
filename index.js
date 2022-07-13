let randomize_array=document.getElementById("randomize_array_btn");
let sort_btn=document.getElementById("sort_btn");
let bars_container=document.getElementById("bars_container");
let select_algo=document.getElementById("algo");
let slider=document.getElementById("slider");
let speed = document.getElementById("speed");

let minRange=1;
let maxRange=slider.value;
let numOfBars=slider.value;
let heightFactor=4;
let speedFactor=100;
let unsorted_array=new Array(numOfBars);

// slider
slider.addEventListener("input",function(){
    numOfBars=slider.value;
    maxRange=slider.value;

    bars_container.innerHTML="";
    unsorted_array=createRandomArray();
    renderBars(unsorted_array);
});

// speed

speed.addEventListener("change",(e)=>{
    speedFactor=parseInt(e.target.value);
});

let algotouse="";

// algo
select_algo.addEventListener("change",function(){
    // console.log('csihfi');
    algotouse=select_algo.value;
});


function randomNum(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

function createRandomArray(){
    let array=new Array(numOfBars);
    for(let i=0;i<numOfBars;i++){
       array[i]=randomNum(minRange,maxRange);
    }
    return array;
}

document.addEventListener("DOMContentLoaded" ,function(){
    unsorted_array= createRandomArray();
    renderBars(unsorted_array);
});

function renderBars(array){
    for(let i=0;i<numOfBars;i++){
        let bar=document.createElement("div");
    bar.classList.add("bar");
    bar.style.height=array[i]*heightFactor+"px";
    bars_container.appendChild(bar);
    }
}

randomize_array.addEventListener("click",function() {
    unsorted_array= createRandomArray();
    bars_container.innerHTML="";
    renderBars(unsorted_array);
});

function sleep(ms){
    return new Promise((resolve)=> setTimeout(resolve,ms));
}

async function bubbleSort(array){
    let bars=document.getElementsByClassName("bar");
    for(let i=0;i<array.length;i++)
    {
        // let bars=document.getElementsByClassName("bar");
        for(let j=0;j<array.length-i-1;j++)
        {
            if(array[j]>array[j+1]){
                for(let k=0;k<bars.length;k++)
                if(k!==j && k!==j+1){
                    bars[k].style.backgroundColor="white";
                }
                let temp=array[j];
                array[j]=array[j+1];
                array[j+1]=temp;
                bars[j].style.height=array[j]*10+"px";
                bars[j].style.backgroundColor="lightgreen";
                bars[j+1].style.height=array[j+1]*10+"px";
                bars[j+1].style.backgroundColor="lightgreen";
                
                await sleep(speedFactor);
                
            }
        }
        await sleep(speedFactor);
    }
    return array;
}

async function swap(items,leftIndex,rightIndex,bars){
    var temp=items[leftIndex];
    items[leftIndex]=items[rightIndex];
    items[rightIndex]=temp;
    bars[leftIndex].style.height=items[leftIndex] * heightFactor+"px";
    bars[leftIndex].style.backgroundColor="lightgreen";
    bars[rightIndex].style.height=items[rightIndex] * heightFactor+"px";
    bars[rightIndex].style.backgroundColor="lightgreen";

    await sleep(speedFactor);
}

async function partition(items,left,right){
    let bars=document.getElementsByClassName("bar");
    let pivotIndex=Math.floor((right+left)/2);
    var pivot=items[pivotIndex];
    bars[pivotIndex].style.backgroundColor="red";

    for(let i=0;i<bars.length;i++)
    {
        if(i!= pivotIndex){
            bars[i].style.backgroundColor="aqua";
        }
    }

    (i=left),
    (j=right);
    while(i<=j){
        while(items[i]<pivot){
            i++;
        }
        while(items[j]>pivot){
            j--;
        }
        if(i<=j){
            await swap(items,i,j,bars);
            i++;
            j--;
        }
    }
    return i;
}

// quicksort
async function quickSort(items,left,right){
    var index;
    let bars=document.getElementsByClassName("bars");
    if(items.length>1){
        index=await partition(items,left,right);
        if(left<index-1){
            await quickSort(items,left,index-1);
        }
        if(index<right)
        {
            await quickSort(items,index,right)
;        }
    }

    for(let i=0;i<bars.length;i++)
    {
        bars[i].style.backgroundColor="aqua";
    }
    return items;
}
// sort_btn.addEventListener("click", function () {
//       let sorted_array = quickSort(unsorted_array, 0, numOfBars - 1);
//       console.log(sorted_array);
//     });
// insertionSort

async function InsertionSort(array){
    let bars=document.getElementsByClassName("bar");
    for(let i=1;i<array.length;i++)
    {
        let key=array[i];
        let j=i-1;
        while(j>=0 && array[j]>key){
            array[j+1]=array[j];
            bars[j+1].style.height=array[j+1]*heightFactor+"px";
            bars[j+1].style.backgroundColor="red";

            await sleep(speedFactor);
            for(let k=0;k<bars.length;k++){
                if(k!=j+1)
                {
                    bars[k].style.backgroundColor="aqua";
                }
            }
            j=j-1;
        }
        array[j+1]=key;
        bars[j+1].style.height=array[j+1]*heightFactor + "px";
        bars[j+1].style.backgroundColor="lightgreen";
    }
    for(let k=0;k<bars.length;k++)
    {
        bars[k].style.backgroundColor="aqua";
    }
    return array;
} 
// sort_btn.addEventListener("click", function () {
//     let sorted_array = InsertionSort(unsorted_array);
//     return (sorted_array);
//   });
// heapsort
async function HeapSort(array){
    let bars =document.getElementsByClassName("bar");
    for(let i=Math.floor(array.length/2);i>=0;i--){
        await heapify(array,array.length,i);
    }
    for(let i=array.length-1;i>=0;i--)
    {
        await swap(array,0,i,bars);
        await heapify(array,i,0);
    }
    for(let k=0;k<bars.length;k++)
    {
        bars[k].style.backgroundColor="aqua";
        await sleep(speedFactor);
    }
    console.log(array);
    return array;
}
async function heapify(array,n,i){
    let bars=document.getElementsByClassName("bar");
    let largest =i;
    let left=2*i+1;
    let right=2*i+2;
    if(left<n && array[left]>array[largest]){
        largest=left;
    }
    if(right<n && array[right]>array[largest]){
        largest=right;

    }

    if(largest!=i)
    {
        await swap(array,i,largest,bars);
        await heapify(array,n,largest);
    }
}

async function swap(array,i,j,bars){
    let temp=array[i];
    array[i]=array[j];
    array[j]=temp;
    bars[i].style.height=array[i]*heightFactor+"px";
    bars[i].style.backgroundColor="red";
    bars[j].style.height=array[j]*heightFactor+"px";
    bars[j].style.backgroundColor="red";
    await sleep(speedFactor);

    for(let k=0;k<bars.length;k++){
        if(k!=i && k!=j){
            bars[k].style.backgroundColor="aqua"
        }
    }
    return array;
}

// merge sort
async function mergeSort(arr){
    let bars=document.getElementsByClassName("bar");
    if(arr.length<2){
        return arr;
    }
    const middle=Math.floor(arr.length/2);
    const left=arr.slice(0,middle);
    const right=arr.slice(middle);
    let actualHalf=await mergeSort(left);
    await mergeSort(right);

    let i=0;
    let j=0;
    let k=0;

    while(i<left.length && j<right.length){
        if(left[i]<right[j]){
            arr[k]=left[i];
            i++;
        }
        else{
            arr[k]=right[j];
            j++;
        }

        bars[k].style.height=arr[k]*heightFactor +"px";
        bars[k].style.backgroundColor="lightgreen";
        if(k+arr.length<bars.length){
            bars[k+arr.length].style.height=arr[k]*heightFactor+"px";
            bars[k+arr.length].style.backgroundColor="yellow";
        }
        await sleep(speedFactor);
        k++;
    }
    while(i<left.length){
        arr[k]=left[i];
        bars[k].style.height=arr[k]*heightFactor+"px";
        bars[k].style.backgroundColor="lightgreen";
        await sleep(speedFactor);
        i++;
        k++;
    }
    while(j<right.length){
        arr[k]=right[j];
        bars[k].style.height=arr[k]*heightFactor+"px";
        bars[k].style.backgroundColor="lightgreen";
        await sleep(speedFactor);
        j++;
        k++;
    }
    for(let k=0;k<bars.length;k++){
        bars[k].style.backgroundColor="aqua";
    }
    return arr;
}

function mergeSortD(arr,start,end){
    if(arr.length<2){
        return arr;
    }
    let middle=Math.floor((start+end)/2);
    let left=arr.slice(start,middle);
    let right=arr.slice(middle,end);
    mergeSort(right);
}

sort_btn.addEventListener("click",function(){
    switch(algotouse){
        case "bubble":
            bubbleSort(unsorted_array);
            break;
        case "merge":
            if(
                confirm(
                    "Merge sort is not visualized properly. Do you want to continue?"
                )
            ) {
                mergeSort(unsorted_array);
            } else {
              break;
            }
            break;
        case "heap":
            HeapSort(unsorted_array);
            break;
        case "insertion":
            InsertionSort(unsorted_array);
            break;
        case "quick":
            quickSort(unsorted_array,0,unsorted_array.length-1);
            break;
        default:
            bubbleSort(unsorted_array);
            break;

    }

});