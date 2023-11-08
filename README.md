# LAB - 12

## Odd Duck

I build a web application with the purpose of displaying three potential products side-by-side, which are combined at random. The user can vote for 1 of the 3 products displayed that they think should be the next new product.

The app calculates the vote totals and number of views each product receives, and caps the number of votes at 25. The results are rendered in a bar chart that displays both the number of votes and the number of views for each product.

### Author: Rhett Chase

### Collaborators

- Niles, Armando (11/7/23) - shared some methods that worked for us and did some troubleshooting together

### Links and Resources

- [submission PR](https://github.com/rhettchase/code-201-odd-duck)
- [web.dev FlexBox](https://web.dev/learn/css/flexbox/)
- [MDN - Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
- [chart.JS](https://www.chartjs.org/docs/latest/getting-started/)
- ChatGPT

### Lighthouse Accessibility Report Score

![Acessibility Score](img/accessibility.png)

### Reflections and Comments

- I used a constructor function that creates an object associated with each product
- I developed an algorithm that randomly generates three unique product images from the directory and displays them side by side
- I used `.slice()` to generate a copy of the product array without changing the original
- To enable the random generation and ensure that all the products would be viewed on the list but then not recycled, I used `.pop()`
- `EventListeners` were utilized to track the number of votes and invoke different functions with each click
- I used `document.querySelector` to select the appropriate elements from the html file to link it the javascript variables
- I refactored my code to make `Product.allProducts` and `Product.workingProducts` properties of the construction function itself
- I created a bar chart that rendered when pressing the results button `EventListener`
- I set up a function to remove the `EventListener` on the button once the results were rendered once
