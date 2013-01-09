# jquery.paginationNav

A jquery plugin that makes a numbered list in order to easily facilitate paging through lists.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/gunderson/jquery.paginationNav/master/dist/jquery.paginationNav.min.js
[max]: https://raw.github.com/gunderson/jquery.paginationNav/master/dist/jquery.paginationNav.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery.paginationNav.min.js"></script>
```

## Documentation

### 1. Usage

    $.(selector).paginationNav({numPages: 10 ... });

### 2. Options

#### numPages

    default = 0;

The total number of pages to page through.


#### visibleNums

    default = 5;

Number of digits to show.

#### currentPosition

    default = 2;

0-indexed position of the currently active page number as the page numbers scroll through

#### showPrev

	default = true;

Whether to show "Prev" button before the list.

#### showNext

	default = true;

Whether to show "Next" button after the list.

#### showFirst

	default = true;

Whether to always show the first number in the list as a way to jump to the beginning.

#### showLast

	default = true;

Whether to always show the last number in the list as a way to jump to the end.

#### loop: false

	default = true;

Whether to loop back to the beginning if next is pressed while on the final number, or to loop to the end if prev is pressed from number 0.

### 3. Events

#### setPage

	data: {
		pageNumber: 0,
		direction: 1
	}

Dispatched when the page number is changed

##### direction

    default = 1;

The direction of the pagination. If the new page number is greater than the previous page, returns 1. If the new page number is less than the previous page, returns -1.



## Examples

	$('#paginationNav').paginationNav({
        numPages: 10,
        visibleNums: 6,
        currentPosition: 2,
        showFirst: false,
        showLast: false
    });

## Release History
_(Nothing yet)_
