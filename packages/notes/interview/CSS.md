# 收集点面试题（CSS 篇）

---

### 1. ==如何优化 CSS 性能？有哪些常用的优化技巧？==

1. **拆分样式**，避免过多的选择器嵌套，嵌套过多会导致 CSS 解析和渲染变慢。
2. <a href='#reflow'> 减少**重排(回流)**操作，以及减少不必要的**重绘**。</a>
3. 避免使用**昂贵的 CSS 属性和值**，比如 box-shadow、border-radius、text-shadow 等属性在某些情况下可能会对性能产生较大影响，因此需要在使用时谨慎选择。
4. **压缩 CSS 文件**，压缩 CSS 可以减少文件大小，从而减少网络传输时间，加快页面加载速度。（ Gzip ）
5. 使用浏览器的**开发者工具**，浏览器的开发者工具可以帮助我们**分析和优化 CSS 性能**。我们可以通过开发者工具的性能分析工具，找出慢的 CSS 选择器和属性，然后进行优化。
6. 利用**继承机制**，父元素定义了子元素就不用定义。

### 2. ==如何实现一个响应式布局？能否具体说说实现方法和相关技术？==

1. 使用 CSS3 媒体查询，在 CSS 中使用 `@media` 根据不同的设备宽高来设置不同的样式

1. 使用 Rem 相对单位，Rem 是相对于 HTML 也就是 **根元素** 的字体大小来计算的元素尺寸，可以结合媒体查询动态设置根元素的 font-size 。

1. 使用 flex 弹性布局。

    > Flex 布局是一种基于 **弹性盒子** 模型的布局方式，通过设置容器的 `display` 属性为 flex，即可将子元素**排列成一行或一列**，并通过设置一些属性来控制子元素的位置、大小、顺序等。

1. 使用 grid 栅格布局。

    > Grid 布局是一种基于 **网格** 模型的布局方式，通过设置容器的 display 属性为 grid，即可将子元素排列成 **二维网格**，并通过设置一些属性来控制子元素在网格中的位置、大小、顺序等。

### 3. ==你对 CSS 盒模型有了解吗？可以简单介绍一下盒模型的概念和组成部分吗？==

CSS 盒模型就是描述了一个 HTML 元素的大小和组成部分，一般包括了 **内容区域、内外边距、边框。**

同时，盒模型分为 **怪异盒模型**(IE) 和 **标准盒模型**(W3C) ，标准盒模型就是指元素的宽高只包含 **内容区域**，而怪异盒模型的元素宽高包括了 **内容区域、边框、内边距** 这三样。

通过 `box-sizing` 属性来切换不同的盒模型。

### 4. ==对 HTML 语义化的理解是什么？并给出一个实际应用的例子。==

语义化就是使用一些 **见名知意** 的 html 标签来搭建网页结构，比如 `header`，`nav`，`section`，`side`，`article` 等标签来构建网页布局。HTML 语义化标签的确能够增加页面的可读性，可维护性和可访问性，同时也更有利于 **SEO**。

例子：如果你正在开发一个博客网站，那么可以使用 `<header>`标签来包含博客标题和描述，使用`<nav>`标签包含导航栏，使用`<article>`标签包含博客正文，使用`<aside>`标签包含侧边栏信息，

### <a id='reflow' href='https://blog.csdn.net/weixin_48491416/article/details/123452651'>5. ==介绍一下回流和重绘==</a>

1. 浏览器会把获取到的 HTML 代码解析成一个**DOM 树**，html 中的每一个元素都是 DOM 树的一个节点，根节点也就是我们说的 document 对象。在渲染树中的一部分（或者全部）因为元素的规模**尺寸**、**布局** 、**显隐**等改变而需要重新构建，这就称为回流。
2. 在渲染树中的一些元素需要更新属性，而这些属性只是影响元素的外观、风格，不影响布局，就称为重绘。

> 回流必定会引起重绘，重绘一定不会引起回流
>
> 回流会导致页面重排，影响性能

#### 如何避免？

1. 避免使用 table 布局，一个动全都动。
2. 将动画效果应用到 position 属性为 absolute 或 fixed 的元素上，因为他们本身就脱离了文档流。
3. 避免频繁操作样式，最好**一次性**重写 style 属性，或者将样式列表定义为 class 并一次性更改 class 属性。
4. 也可以先为元素**设置 display: none**，操作结束后再把它显示出来。因为在 display 属性为 none 的元素上进行的 DOM 操作不会引发回流和重绘。

#### ==拓展：CSS3 硬件加速==

比起考虑如何减少回流重绘，我们更期望的是，根本不要回流重绘。

1. 使用 css3 硬件加速，可以让 **transform、opacity、filters** 这些动画不会引起回流重绘 。

2. 对于动画的其它属性，比如 background-color 这些，还是会引起重绘的，不过它还是可以提升这些动画的性能。

常见的触发硬件加速的 CSS 属性：

-   **transform**
-   **opacity**
-   filters
-   Will-change

### 6. ==如何实现一个元素的水平垂直居中==

1. 使用 flex 布局 (常规)

```css
.contianer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh; /** 要有高度 **/
}
.item {
    width: 50px;
    height: 50px;
}
```

2. 使用 absolute + transform

```css
.contianer {
    position: relative;
}

.item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

3. 使用 grid 布局

```css
.container {
    display: grid;
    place-items: center;
}
```

4. 使用 flex 布局 (auto)

```css
.contianer {
    display: flex;
    height: 100vh; /** 要有高度 **/
}
.item {
    margin: auto;
}
```

> 记得研究

### 7.==margin: 0 auto的原理==

满足以下等式

margin-left + border-left-width + padding-left + 本身width + padding-right + border-right-width + margin-right = 容器width

border 和 padding 未设置就是 0，margin 0 auto就是左右 margin 为 auto ，具体表现就是，width 确定的情况下，margin 就会等于容器 width - 本身 width 再除以 2，表现出来就是左右 margin 对半分，所以是水平居中

### 8.==1px问题==

就是因为各个设备的像素都不一样，为了统一方便开发，就有了逻辑像素和物理像素，那比如设备像素比(DPR)是 1:2 那么在 css 中实际上写的是逻辑像素，我设置 1px，在设备上表现的其实是 2px，这样就会看起来很粗。

解决方法：

1. 媒体查询，判断设备的像素比是多少然后对应调整，这就存在不兼容的问题。
2. viewport + rem，修改 meta标签的 initial-scale，然后修改根元素字体大小然后开发用rem。
3. **伪元素模拟边框，transform 的 scale(50%) 缩放边框**

```css
.scale-1px{
  position: relative;
  border:none;
}
.scale-1px:after{
  content: '';
  position: absolute;
  bottom: 0;
  background: #000;
  width: 100%;
  height: 1px;
  /*核心是利用transform缩放边框*/
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
```

4. box-shadow模拟边框

### 9.==flex:1 代表什么意思==

