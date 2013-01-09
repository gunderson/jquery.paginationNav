jquery.paginationNav
====================

### 1. Usage

    $.(selector).paginationNav({numPages: 10 ... });

### 2. Options

### numPages

    default = 0;

The total number of pages to page through.

### transitionFrom: 1,

    default = 1;

The direction of the pagination. If the new page number is greater than the previous page, returns 1. If the new page number is less than the previous page, returns -1.

### visiblePrev

    default = 2;

Number of digits to show before to the active number.

### visibleNext

    default = 2;

Number of digits to show after to the active number.

### showPrev

	default = true;

Whether to show "Prev" button before the list.

### showNext

	default = true;

Whether to show "Next" button after the list.

### showFirst

	default = true;

Whether to always show the first number in the list as a way to jump to the beginning.

### showLast

	default = true;

Whether to always show the last number in the list as a way to jump to the end.

### loop: false

	default = true;

Whether to loop back to the beginning if next is pressed while on the final number, or to loop to the end if prev is pressed from number 0.

#### 3. Events

#### setPage

	data: {
		pageNumber: 0,
		transitionFrom: 1
	}

Dispatched when the page number is changed



