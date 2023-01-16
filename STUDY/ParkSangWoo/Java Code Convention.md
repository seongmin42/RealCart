<section class="pt-4 pb-4 pb-md-5 border border-top-0 border-right-0 border-left-0">
<h1>
    Java Coding Conventions
</h1>
<ul>
<li>원문(영어): <a href="https://docs.google.com/document/d/1F6A1yc6ZfeLyzAjmPjdJZwLXTd-QXy_MhGA_so7NlSQ/edit">POCU Java Coding Standards</a></li>
<li>Scrapped from: <a href="https://docs.popekim.com/ko/coding-standards/pocu-java"> POCU 아카데미용 Java 코딩 표준</a></li>
</ul>
<h2 id="머리말">머리말</h2>
<h3 id="기본-원칙">기본 원칙</h3>
<ol>
<li>가독성을 최우선으로 삼는다. (대부분의 경우 코드 그 자체가 문서의 역할을 해야 함)</li>
<li>정말 합당한 이유가 있지 않는 한, 통합개발환경(IDE)의 자동 서식을 따른다. (윈도우 IntelliJ의 "Ctrl + Alt + L" 기능)</li>
<li>본 코딩표준을 따라 잘 짜여진 기존의 코드에서 배운다.</li>
</ol>
<h2 id="참조문서">참조문서</h2>
<p>이 코딩 표준은 아래의 코딩 표준들에서 영감을 얻었음.</p>
<ul>
<li><a href="https://google.github.io/styleguide/javaguide.html">Google Java Style Guide</a></li>
<li><a href="https://source.android.com/setup/contribute/code-style">Android Open Source Project Java Code Style for Contributors</a></li>
<li><a href="https://www.oracle.com/technetwork/java/codeconventions-150003.pdf">Java Code Conventions</a> by Oracle</li>
</ul>
<h2 id="i-메인-코딩-표준">I. 메인 코딩 표준</h2>
<ol>
<li>패키지 이름은 모두 소문자로 작성한다.
<pre class="language-java" tabindex="0"><code class="language-java"> <span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>awesome<span class="token punctuation">.</span>math</span><span class="token punctuation">;</span>
</code></pre>
</li>
<li>
<p><code>import</code>를 할 때는 전체 이름을 다 적는다. (*를 사용하지 않음)</p>
<p><strong>틀린 방식:</strong></p>
<pre class="language-java" tabindex="0"><code class="language-java"> <span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>awesome<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
</code></pre>
<p><strong>올바른 방식:</strong></p>
<pre class="language-java" tabindex="0"><code class="language-java"> <span class="token keyword">import</span> <span class="token namespace">foo<span class="token punctuation">.</span>bar</span><span class="token punctuation">;</span>
</code></pre>
</li>
<li>
<p>클래스와 열거형을 선언할 때는 파스칼 표기법을 따른다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"> <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PlayerManager</span> <span class="token punctuation">{</span>
     <span class="token comment">// 코드 생략</span>
 <span class="token punctuation">}</span>
</code></pre>
<pre class="language-java" tabindex="0"><code class="language-java"> <span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">AccountType</span> <span class="token punctuation">{</span>
     <span class="token comment">// 열거형 멤버 생략</span>
 <span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p>클래스, 멤버 변수, 메서드에는 언제나 접근 제어자를 붙인다. 단, 기본 패키지 접근 권한이 필요할 경우에는 그렇지 않는다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"> <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
     <span class="token keyword">int</span> mHeight<span class="token punctuation">;</span> <span class="token comment">// 기본 (패키지) 접근 권한</span>
     <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>

     <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token comment">// 메서드 구현 생략</span>
     <span class="token punctuation">}</span>

     <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token comment">// 메서드 구현 생략</span>
     <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p>접근 제어자는 다른 수정자(modifier)앞에 붙인다.</p>
<p><strong>틀린 방식:</strong></p>
<pre class="language-java" tabindex="0"><code class="language-java"> <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token comment">// 메서드 구현 생략</span>
 <span class="token punctuation">}</span>
</code></pre>
<p><strong>올바른 방식:</strong></p>
<pre class="language-java" tabindex="0"><code class="language-java"> <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token comment">// 메서드 구현 생략</span>
 <span class="token punctuation">}</span>
</code></pre>
</li>
<li>모든 메서드 이름은 카멜 표기법을 따라 짓는다.
<pre class="language-java" tabindex="0"><code class="language-java"> <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token comment">// 메서드 구현 생략</span>
 <span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p>지역 변수와 메서드 매개변수 이름은 카멜 표기법을 따라 짓는다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"> <span class="token keyword">int</span> age <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>

 <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">someMethod</span><span class="token punctuation">(</span><span class="token keyword">int</span> someParameter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token keyword">int</span> someNumber<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre>
</li>
<li>메서드 이름은 동사로 시작한다.
<pre class="language-java" tabindex="0"><code class="language-java"> <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token comment">// 메서드 구현 생략</span>
 <span class="token punctuation">}</span>
</code></pre>
</li>
<li>상수로 사용하는 <code>final</code> 필드의 변수명은 모두 대문자로 하되 밑줄로 각 단어를 분리한다.
<pre class="language-java" tabindex="0"><code class="language-java"> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">SOME_CONSTANT</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre>
</li>
<li>
<p>인터페이스의 이름은 <code>I</code>로 시작한다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">interface</span> <span class="token class-name">IFlyable</span><span class="token punctuation">;</span>
</code></pre>
</li>
<li>
<p>열거형 멤버의 이름은 모두 대문자로 하되 밑줄로 각 단어를 분리한다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">MyEnum</span> <span class="token punctuation">{</span>
    <span class="token constant">FUN</span><span class="token punctuation">,</span>
    <span class="token constant">MY_AWESOME_VALUE</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p>멤버 변수의 이름은 카멜 표기법을 따른다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> nickName<span class="token punctuation">;</span>
    <span class="token keyword">protected</span> <span class="token class-name">String</span> familyName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p>값을 반환하는 메서드의 이름은 무엇을 반환하는지 알 수 있게 짓는다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</li>
<li>
<p>단순히 반복문에 사용되는 변수가 아닌 경우엔 <code>i</code>, <code>e</code> 같은 변수명 대신 <code>index</code>, <code>employee</code> 처럼 변수에 저장되는 데이터를 한 눈에 알아볼 수 있는 변수명을 사용한다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">int</span> i<span class="token punctuation">;</span> <span class="token comment">// BAD</span>
<span class="token keyword">int</span> a<span class="token punctuation">;</span> <span class="token comment">// BAD</span>
<span class="token keyword">int</span> index<span class="token punctuation">;</span> <span class="token comment">// GOOD</span>
<span class="token keyword">int</span> age<span class="token punctuation">;</span> <span class="token comment">// GOOD</span>
</code></pre>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token comment">// GOOD</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p>줄임말(축약어)를 변수 및 메서드 명에 사용할 때는 기타 단어들과 동일하게 사용한다. 즉, 파스칼 표기법을 따르는 경우에는 오직 첫 번째 글자만 대문자로 바꾸며, 카멜 표기법을 따르는 경우에는 두 번째 단어부터 첫 번째 글자만 대문자로 바꾼다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">int</span> orderId
<span class="token class-name">String</span> httpAddress<span class="token punctuation">;</span>
<span class="token class-name">String</span> myHttp<span class="token punctuation">;</span>
</code></pre>
</li>
<li>
<p><code>public</code> 멤버 변수 대신 getter와 setter 메서드를 사용한다.</p>
<p><strong>틀린 방식:</strong></p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token class-name">Name</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p><strong>올바른 방식:</strong></p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p>지역 변수를 선언할 때는 그 지역 변수를 사용하는 코드와 동일한 줄에 선언하는 것을 원칙으로 한다.</p>
</li>
<li>
<p><code>double</code>이 반드시 필요한 경우가 아닌 이상 부동 소수점 값에 <code>f</code>를 붙여준다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">float</span> f <span class="token operator">=</span> <span class="token number">0.5f</span><span class="token punctuation">;</span>
</code></pre>
</li>
<li>
<p><code>switch</code> 문에 언제나 <code>default:</code> 케이스를 넣는다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">switch</span> <span class="token punctuation">(</span>number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> 
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p><code>switch</code> / <code>case</code> 문 끝에 <code>break</code>를 넣지 않고 그 바로 아래 <code>case</code> 문의 코드를 실행하고 싶은 경우 <code>// intentional fallthrough</code> 라는 주석을 추가한다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">switch</span> <span class="token punctuation">(</span>number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span>
        <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// intentional fallthrough</span>
    <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
        <span class="token function">doFallthrough</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span>
        <span class="token function">doNotFallthrough</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p><code>switch</code> 문에서 <code>default:</code> 케이스가 절대 실행될 일이 없는 경우, <code>default:</code> 안에 <code>assert (false)</code> 란 코드를 추가하거나 예외를 던진다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> 
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">assert</span> <span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">"unknown type"</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p>또는</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> 
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">"unknown type"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p>재귀 메서드는 이름 뒤에 <code>Recursive</code>를 붙인다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">fibonacciRecursive</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</li>
<li>
<p>클래스 안에서 멤버 변수와 메서드의 등장 순서는 다음을 따른다.</p>
<pre><code>a. public 멤버 변수
b. default 멤버 변수
c. protected 멤버 변수
d. private 멤버 변수
e. 생성자
f. public 메서드
g. default 메서드
h. protected 메서드
i. private 메서드
</code></pre>
</li>
<li>
<p>대부분의 경우 메서드 오버로딩을 피한다.</p>
<p><strong>틀린 방식:</strong></p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">public</span> <span class="token class-name">Anim</span> <span class="token function">getAnim</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token class-name">Anim</span> <span class="token function">getAnim</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p><strong>올바른 방식:</strong></p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">public</span> <span class="token class-name">Anim</span> <span class="token function">getAnimByIndex</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token class-name">Anim</span> <span class="token function">getAnimByName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</li>
<li>
<p>클래스는 각각 독립된 소스 파일에 있어야 한다. 단, 작은 클래스 몇 개를 한 파일 안에 같이 넣어두는 것이 상식적일 경우 예외를 허용한다.</p>
</li>
<li>
<p>파일 이름은 대소문자까지 포함해서 반드시 클래스 이름과 일치해야 한다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token comment">// file: PlayerAnimation.java</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PlayerAnimation</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">class</span> <span class="token class-name">InnerClass1</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
        
    <span class="token keyword">private</span> <span class="token keyword">class</span> <span class="token class-name">InnerClass2</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p>특정 조건이 반드시 충족되어야 한다고 가정(assertion)하고 짠 코드 모든 곳에 <code>assert</code>를 사용한다. <code>assert</code>는 복구 불가능한 조건이다.(예: 대부분의 메서드는 다음과 같은 <code>assert</code>를 가질 수도… <code>assert (parameter != null)</code>)</p>
</li>
<li>
<p><code>assert</code>를 사용할 때는 표현식을 소괄호로 감싼다.</p>
<p><strong>틀린 방식:</strong></p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">assert</span> x <span class="token operator">&gt;</span> <span class="token number">5</span> <span class="token operator">&amp;&amp;</span> x <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token string">"Custom message"</span><span class="token punctuation">;</span>
</code></pre>
<p><strong>올바른 방식:</strong></p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">assert</span> <span class="token punctuation">(</span>x <span class="token operator">&gt;</span> <span class="token number">5</span> <span class="token operator">&amp;&amp;</span> x <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">"Custom message"</span>
</code></pre>
</li>
<li>
<p>비트 플래그 열거형은 이름 뒤에 <code>Flags</code>를 붙인다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">VisibilityFlags</span> <span class="token punctuation">{</span>
    <span class="token comment">// 플래그들 생략</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p>변수 가리기(variable shadowing)는 허용하지 않는다. 이 규칙에 대한 유일한 예외는 멤버 변수와 생성자/setter 매개변수에 동일한 이름을 사용할 때이다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SomeClass</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> count <span class="token operator">!=</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token operator">++</span>count<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p><code>var</code> 키워드를 사용하지 않으려 노력한다. 단, 대입문의 우항에서 자료형이 명확하게 드러나는 경우, 또는 데이터형이 중요하지 않은 경우는 예외를 허용한다.. <code>IIterable</code>/<code>ICollection</code>에 <code>var</code>를 사용하거나 우항의 <code>new</code> 키워드를 통해 어떤 개체가 생성되는지 알 수 있는 등이 허용되는 경우의 좋은 예이다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">var</span> text <span class="token operator">=</span> <span class="token string">"string obviously"</span><span class="token punctuation">;</span> <span class="token comment">// Okay</span>
<span class="token keyword">var</span> age <span class="token operator">=</span> <span class="token number">28</span><span class="token punctuation">;</span>                  <span class="token comment">// Okay</span>
<span class="token keyword">var</span> employee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Okay</span>

<span class="token keyword">var</span> accountNumber1 <span class="token operator">=</span> <span class="token function">getAccountNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// BAD</span>
<span class="token keyword">int</span> accountNumber2 <span class="token operator">=</span> <span class="token function">getAccountNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// GOOD</span>
</code></pre>
</li>
<li>
<p>외부로부터 들어오는 데이터의 유효성은 외부/내부 경계가 바뀌는 곳에서 검증(validate)하고 문제가 있을 경우 내부 메서드로 전달하기 전에 반환해 버린다. 이는 경계를 넘어 내부로 들어온 모든 데이터는 유효하다고 가정한다는 뜻이다.</p>
</li>
<li>
<p>따라서 내부 메서드에서 예외(익셉션)을 던지지 않으려 노력한다. 예외는 경계에서만 처리하는 것을 원칙으로 한다.</p>
</li>
<li>
<p>위 규칙의 예외: <code>enum</code>형을 <code>switch</code>문에서 처리할 때 실수로 처리 안 한 <code>enum</code> 값을 찾기 위해 <code>default:</code> 케이스에서 예외를 던지는 것은 허용</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">switch</span> <span class="token punctuation">(</span>accountType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token class-name">AccountType</span><span class="token punctuation">.</span><span class="token constant">PERSONAL</span><span class="token operator">:</span>
        <span class="token keyword">return</span> something<span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token class-name">AccountType</span><span class="token punctuation">.</span><span class="token constant">BUSINESS</span><span class="token operator">:</span>
        <span class="token keyword">return</span> somethingElse<span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">"unknown type"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p>메서드의 매개변수로 <code>null</code>을 허용하지 않는 것을 추구한다. 특히 <code>public</code> 메서드일 경우 더욱 그러하다.</p>
</li>
<li>
<p><code>null</code> 매개변수를 사용할 경우 변수명 뒤에 <code>OrNull</code>를 붙인다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">public</span> <span class="token class-name">Anim</span> <span class="token function">getAnim</span><span class="token punctuation">(</span><span class="token class-name">String</span> nameOrNull<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p>메서드에서 <code>null</code>을 반환하지 않는 것을 추구한다. 특히 <code>public</code> 메서드일 경우 더욱 그러하다. 그러나 때로는 예외를 던지는 것을 방지하기 위해 그래야 할 경우도 있다.</p>
</li>
<li>
<p>메서드에서 <code>null</code>을 반환할 때는 메서드 이름 뒤에 <code>OrNull</code>을 붙인다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getNameOrNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</li>
<li>메서드를 오버라이딩할 때는 언제나 <code>@Override</code> 어노테이션을 붙인다.</li>
</ol>
<h2 id="ii-소스-코드-포맷팅">II. 소스 코드 포맷팅</h2>
<ol>
<li>
<p>탭(tab)은 IntelliJ의 기본 값을 사용한다. 다른 IDE를 사용할 경우에는 실제 탭 문자 대신 띄어쓰기 4칸을 사용한다.</p>
</li>
<li>
<p>중괄호 (<code>{}</code>) 는 새로운 줄에서 열지 않으나 닫을 때는 새로운 줄에서 닫는다. 단, 다음 항목의 예외는 허용한다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"> <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token keyword">while</span> <span class="token punctuation">(</span>expression<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token comment">// 코드 생략</span>
     <span class="token punctuation">}</span>

     <span class="token keyword">try</span> <span class="token punctuation">{</span>
         <span class="token comment">// 코드 생략</span>
     <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ExceptionClass</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token comment">// 코드 생략</span>
     <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p><code>if</code>, <code>if-else</code>, <code>if-else-if-else</code> 문은 다음의 중괄호 스타일을 사용한다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"> <span class="token keyword">if</span> <span class="token punctuation">(</span>expression<span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token comment">// 코드 생략</span>
 <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>expression<span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token comment">// 코드 생략</span>
 <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
     <span class="token comment">// 코드 생략</span>
 <span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p>중괄호 안(<code>{}</code>)에 코드가 한 줄만 있더라도 반드시 중괄호를 사용한다.</p>
<pre class="language-java" tabindex="0"><code class="language-java"> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>alive<span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token keyword">return</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre>
</li>
<li>
<p>한 줄에 변수 하나만 선언한다.</p>
<p><strong>틀린 방식:</strong></p>
<pre class="language-java" tabindex="0"><code class="language-java"> <span class="token keyword">int</span> counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre>
<p><strong>올바른 방식:</strong></p>
<pre class="language-java" tabindex="0"><code class="language-java"> <span class="token keyword">int</span> counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
 <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre>
</li>
</ol>
</section>
