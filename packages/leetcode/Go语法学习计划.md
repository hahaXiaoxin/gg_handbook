# Go 语法学习计划（通过 LeetCode）

## 学习路线概览

按语法点递进排列，从最基础到逐步深入，每个阶段精选 1-2 题。每道题均附带语法点案例。

---

## 第一阶段：基础语法入门

### 题 1：Two Sum（两数之和）

**核心语法点：**

#### 1.1 变量声明：`var` vs `:=`

```go
// var 显式声明（可指定类型）
var result []int          // 零值初始化，result == nil
var count int = 0         // 带初始值
var name string = "hello"

// := 短声明（只能在函数内使用，自动推断类型）
nums := []int{2, 7, 11, 15}  // 切片字面量
target := 9
m := make(map[int]int)       // 创建 map
```

> **要点**：`:=` 只能在函数体内使用；包级别变量必须用 `var`。

#### 1.2 `for range` 循环

```go
// 遍历 slice，i 是索引，v 是值的副本
for i, v := range nums {
    fmt.Println(i, v)
}

// 只要索引
for i := range nums {
    fmt.Println(i)
}

// 只要值（用 _ 忽略索引）
for _, v := range nums {
    fmt.Println(v)
}

// 传统的三段式 for（Go 没有 while）
for i := 0; i < len(nums); i++ {
    fmt.Println(nums[i])
}
```

#### 1.3 `map` 的创建与使用

```go
// 方式一：make
m := make(map[int]int)

// 方式二：字面量
m := map[int]int{2: 0, 7: 1}

// 增/改
m[11] = 2

// 查（comma ok 模式）
val, ok := m[7]   // ok==true 表示 key 存在
if ok {
    fmt.Println("found:", val)
}

// 删
delete(m, 7)
```

#### 1.4 函数多返回值

```go
// Go 支持多返回值，常用于返回结果 + 错误
func twoSum(nums []int, target int) []int {
    m := make(map[int]int)
    for i, v := range nums {
        if j, ok := m[target-v]; ok {
            return []int{j, i}  // 直接返回切片字面量
        }
        m[v] = i
    }
    return nil  // nil 切片
}
```

---

### 题 2：Palindrome Number（回文数）

**核心语法点：**

#### 2.1 `if/else`（条件不需要括号）

```go
if x < 0 {
    return false
} else if x == 0 {
    return true
} else {
    // ...
}

// 可以在 if 前执行一个简单语句（分号分隔）
if num := x; num < 0 {
    return false
}
// num 作用域仅限于 if-else 块
```

#### 2.2 类型转换

```go
import "strconv"

// int -> string
s := strconv.Itoa(121)       // "121"

// string -> int
n, err := strconv.Atoi("123")
if err != nil {
    // 处理错误
}

// 字符串索引得到的是 byte（uint8）
s := "hello"
b := s[0]   // 'h' 的 ASCII 值 104，类型是 byte

// byte -> string
ch := string(s[0])  // "h"
```

#### 2.3 `for` 循环（Go 只有 `for`）

```go
// 经典三段式
for i := 0; i < len(s); i++ {
    // ...
}

// 模拟 while
for x > 0 {
    reversed = reversed*10 + x%10
    x /= 10
}

// 死循环
for {
    if condition {
        break
    }
}
```

---

## 第二阶段：切片与字符串

### 题 3：Reverse String（反转字符串）

**核心语法点：**

#### 3.1 切片基础

```go
// 切片是动态数组，底层引用数组
s := []int{1, 2, 3, 4, 5}

// 截取（左闭右开）
s[1:3]  // [2, 3]
s[:3]   // [1, 2, 3]
s[2:]   // [3, 4, 5]

// len 和 cap
len(s)  // 5（长度）
cap(s)  // 5（容量）

// append（可能触发扩容，返回新切片）
s = append(s, 6)       // [1,2,3,4,5,6]
s = append(s, 7, 8, 9) // [1,2,3,4,5,6,7,8,9]
```

#### 3.2 `[]byte` 与字符串

```go
// string 是不可变的，需要转 []byte 才能修改
s := "hello"

// string -> []byte
b := []byte(s)

// 修改
b[0] = 'H'

// []byte -> string
s = string(b)  // "Hello"
```

#### 3.3 双指针遍历

```go
func reverseString(s []byte) {
    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
        s[i], s[j] = s[j], s[i]  // 多重赋值（同时交换，不需要临时变量）
    }
}
```

> **Go 特性**：`a, b = b, a` 可以直接交换两个变量，无需临时变量。

---

### 题 4：Longest Common Prefix（最长公共前缀）

**核心语法点：**

#### 4.1 `strings` 标准库

```go
import "strings"

// 判断前缀
strings.HasPrefix("hello", "he")  // true

// 判断后缀
strings.HasSuffix("hello", "lo")  // true

// 判断包含
strings.Contains("hello", "el")   // true

// 查找子串位置（不存在返回 -1）
strings.Index("hello", "ll")      // 2

// 拼接
strings.Join([]string{"a", "b", "c"}, "-")  // "a-b-c"

// 分割
strings.Split("a,b,c", ",")  // ["a", "b", "c"]

// 重复
strings.Repeat("ab", 3)      // "ababab"
```

#### 4.2 遍历字符串（rune 处理）

```go
s := "你好世界"

// 方式一：for range（按 rune 遍历，正确处理中文等多字节字符）
for i, r := range s {
    fmt.Printf("索引: %d, 字符: %c\n", i, r)
}
// 输出：索引:0 字符:你, 索引:3 字符:好, 索引:6 字符:世, 索引:9 字符:界

// 方式二：按 byte 遍历（不推荐用于中文）
for i := 0; i < len(s); i++ {
    fmt.Printf("%c", s[i])  // 乱码！
}

// rune 就是 int32，代表 Unicode 码点
var ch rune = '你'  // 20320
```

---

## 第三阶段：Map 进阶与结构体

### 题 5：Valid Anagram（有效的字母异位词）

**核心语法点：**

#### 5.1 `make()` 创建 map/slice

```go
// 创建 map（必须 make，否则 nil map 不能写入）
m := make(map[rune]int)       // 空 map，可以写入
m := make(map[string]int, 10) // 预分配容量（不是长度）

// 创建 slice
s := make([]int, 5)      // 长度 5，元素为 0
s := make([]int, 0, 10)  // 长度 0，容量 10

// 区别：nil map vs 空 map
var m1 map[string]int     // nil map，读取返回零值，写入 panic！
m2 := make(map[string]int) // 空 map，可以读写
```

#### 5.2 `comma ok` 模式

```go
// 判断 map 中 key 是否存在
m := map[string]int{"a": 1}
val, ok := m["a"]  // val=1, ok=true
val, ok = m["b"]   // val=0, ok=false（不存在的 key 返回零值）

// 用于类型断言
var i interface{} = "hello"
s, ok := i.(string)  // s="hello", ok=true
n, ok := i.(int)     // n=0, ok=false（不会 panic）

// 用于 channel 接收
v, ok := <-ch  // ok==false 表示 channel 已关闭且为空
```

#### 5.3 `delete()` 删除 map 元素

```go
m := map[string]int{"a": 1, "b": 2}
delete(m, "a")   // 删除 key "a"
delete(m, "c")   // 删除不存在的 key 也不会报错
```

---

### 题 6：First Unique Character in a String（字符串中的第一个唯一字符）

**语法复习与组合练习：**

```go
func firstUniqChar(s string) int {
    // map[byte]int：key 是字符（byte），value 是出现次数
    count := make(map[byte]int)

    // 第一遍遍历：统计频次
    for i := 0; i < len(s); i++ {
        count[s[i]]++
    }

    // 第二遍遍历：找第一个出现次数为 1 的
    for i := 0; i < len(s); i++ {
        if count[s[i]] == 1 {
            return i
        }
    }
    return -1
}
```

> 这题是前面所有语法的综合练习：`map`、`make`、`for` 循环、字符串索引、`if`。

---

## 第四阶段：指针与方法

### 题 7：Reverse Linked List（反转链表）

**核心语法点：**

#### 7.1 `struct` 定义与初始化

```go
// 定义结构体
type ListNode struct {
    Val  int
    Next *ListNode   // 自引用必须用指针
}

// 初始化方式一：字面量（按字段名）
node := &ListNode{Val: 1, Next: nil}

// 初始化方式二：按顺序（不推荐，可读性差）
node := &ListNode{1, nil}

// 初始化方式三：先 new 再赋值
node := new(ListNode)  // node 是 *ListNode，字段为零值
node.Val = 1

// 初始化方式四：取结构体地址
node := &ListNode{}
node.Val = 1
```

#### 7.2 指针 `*` 和 `&`

```go
// & 取地址
x := 10
p := &x       // p 是 *int 类型，指向 x
fmt.Println(p)  // 0xc00001a0b0（内存地址）
fmt.Println(*p) // 10（解引用）

// * 解引用 / 声明指针类型
*p = 20       // 通过指针修改原值
fmt.Println(x)  // 20

// 指针的零值是 nil
var ptr *int   // ptr == nil

// . 操作符自动解引用（不需要像 C 用 ->）
node := &ListNode{Val: 1}
node.Val = 2          // 等价于 (*node).Val = 2
node.Next = &ListNode{Val: 3}
```

#### 7.3 链表反转（指针操作练习）

```go
func reverseList(head *ListNode) *ListNode {
    var prev *ListNode  // prev == nil
    curr := head

    for curr != nil {
        next := curr.Next  // 保存下一个节点
        curr.Next = prev   // 反转指向
        prev = curr        // prev 前进
        curr = next        // curr 前进
    }
    return prev
}
```

---

### 题 8：Merge Two Sorted Lists（合并两个有序链表）

**核心语法点：**

#### 8.1 递归

```go
func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
    // 基准情况
    if l1 == nil {
        return l2
    }
    if l2 == nil {
        return l1
    }

    // 递归
    if l1.Val < l2.Val {
        l1.Next = mergeTwoLists(l1.Next, l2)
        return l1
    } else {
        l2.Next = mergeTwoLists(l1, l2.Next)
        return l2
    }
}
```

#### 8.2 哑节点（dummy node）技巧

```go
func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
    dummy := &ListNode{}  // 哑节点，简化边界处理
    curr := dummy

    for l1 != nil && l2 != nil {
        if l1.Val < l2.Val {
            curr.Next = l1
            l1 = l1.Next
        } else {
            curr.Next = l2
            l2 = l2.Next
        }
        curr = curr.Next
    }

    // 处理剩余节点
    if l1 != nil {
        curr.Next = l1
    } else {
        curr.Next = l2
    }

    return dummy.Next
}
```

---

## 第五阶段：方法、接口与错误处理

### 题 9：Implement Queue using Stacks（用栈实现队列）

**核心语法点：**

#### 9.1 方法定义（值接收者 vs 指针接收者）

```go
type MyQueue struct {
    inStack  []int
    outStack []int
}

// 指针接收者：可以修改结构体字段
func (q *MyQueue) Push(x int) {
    q.inStack = append(q.inStack, x)
}

// 值接收者：不能修改原结构体（操作的是副本）
func (q MyQueue) Peek() int {
    // q.inStack = append(q.inStack, 1) // 不会影响原值
    return q.outStack[len(q.outStack)-1]
}
```

> **规则**：需要修改结构体用指针接收者；只读可以不用。但为了保持一致，同一个类型最好统一用指针接收者。

#### 9.2 `slice` 模拟栈

```go
// 入栈
stack = append(stack, x)

// 出栈
x := stack[len(stack)-1]
stack = stack[:len(stack)-1]

// 查看栈顶
top := stack[len(stack)-1]

// 判空
len(stack) == 0
```

---

### 题 10：Min Stack（最小栈）

**核心语法点：**

#### 10.1 `interface{}` / `any`

```go
// interface{} 可以接收任意类型（Go 1.18+ 推荐用 any）
var x interface{}
x = 42
x = "hello"
x = []int{1, 2, 3}

// 类型断言
s, ok := x.(string)
if ok {
    fmt.Println("是字符串:", s)
}

// type switch
switch v := x.(type) {
case int:
    fmt.Println("int:", v)
case string:
    fmt.Println("string:", v)
default:
    fmt.Println("unknown type")
}
```

#### 10.2 构造函数（工厂函数）

```go
type MinStack struct {
    stack    []int
    minStack []int
}

// Go 没有构造函数，习惯用 NewXxx 工厂函数
func Constructor() MinStack {
    return MinStack{
        stack:    make([]int, 0),
        minStack: make([]int, 0),
    }
}
```

#### 10.3 `error` 处理

```go
import "errors"
import "fmt"

// 创建错误
err := errors.New("something went wrong")
err := fmt.Errorf("value %d is invalid", x)

// 错误处理模式
func (this *MinStack) Pop() (int, error) {
    if len(this.stack) == 0 {
        return 0, errors.New("stack is empty")
    }
    x := this.stack[len(this.stack)-1]
    this.stack = this.stack[:len(this.stack)-1]
    return x, nil
}
```

---

## 第六阶段：并发（Goroutine & Channel）

### 题 11：Print in Order（按序打印）

**核心语法点：**

#### 11.1 Goroutine

```go
// go 关键字启动一个新的 goroutine（轻量级线程）
func main() {
    go sayHello()  // 异步执行
    time.Sleep(time.Second)  // 等 goroutine 执行完（不推荐，仅示例）
}

func sayHello() {
    fmt.Println("hello from goroutine")
}
```

#### 11.2 Channel 创建与使用

```go
// 无缓冲 channel（同步）
ch := make(chan int)

go func() {
    ch <- 42  // 发送：阻塞直到有接收方
}()

val := <-ch  // 接收：阻塞直到有发送方
fmt.Println(val)  // 42

// 有缓冲 channel（异步，缓冲满之前不阻塞）
ch := make(chan int, 3)
ch <- 1  // 不阻塞
ch <- 2  // 不阻塞
ch <- 3  // 不阻塞
// ch <- 4  // 阻塞！缓冲满了
```

#### 11.3 使用 Channel 同步 goroutine

```go
type Foo struct {
    firstCh  chan struct{}
    secondCh chan struct{}
}

func NewFoo() *Foo {
    return &Foo{
        firstCh:  make(chan struct{}),  // struct{} 不占内存，纯信号
        secondCh: make(chan struct{}),
    }
}

func (f *Foo) First(printFirst func()) {
    printFirst()
    f.firstCh <- struct{}{}  // 发信号给 Second
}

func (f *Foo) Second(printSecond func()) {
    <-f.firstCh  // 等 First 完成
    printSecond()
    f.secondCh <- struct{}{}
}

func (f *Foo) Third(printThird func()) {
    <-f.secondCh  // 等 Second 完成
    printThird()
}
```

#### 11.4 `close()` 关闭 channel

```go
ch := make(chan int, 3)
ch <- 1
ch <- 2
close(ch)  // 关闭 channel

// 关闭后仍可接收剩余数据
v, ok := <-ch  // v=1, ok=true
v, ok = <-ch   // v=2, ok=true
v, ok = <-ch   // v=0, ok=false（channel 已空且关闭）

// 可以用 for range 遍历 channel（直到关闭）
for v := range ch {
    fmt.Println(v)
}
```

---

### 题 12：Print FooBar Alternately（交替打印）

**核心语法点：**

#### 12.1 `select` 多路复用

```go
ch1 := make(chan string)
ch2 := make(chan string)

go func() {
    time.Sleep(1 * time.Second)
    ch1 <- "from ch1"
}()

go func() {
    time.Sleep(500 * time.Millisecond)
    ch2 <- "from ch2"
}()

// select 随机选择一个就绪的 case 执行
select {
case msg := <-ch1:
    fmt.Println(msg)
case msg := <-ch2:
    fmt.Println(msg)
case <-time.After(2 * time.Second):
    fmt.Println("timeout")
}
```

#### 12.2 `sync.Mutex` 互斥锁

```go
import "sync"

type FooBar struct {
    mu sync.Mutex
    n  int
}

func (fb *FooBar) Foo() {
    fb.mu.Lock()    // 加锁
    defer fb.mu.Unlock()  // 函数结束时解锁
    fmt.Print("foo")
}

// 注意：不要复制 Mutex（值传递会复制）
// 必须用指针传递：func (fb *FooBar) Foo()
```

#### 12.3 `sync.WaitGroup` 等待 goroutine

```go
var wg sync.WaitGroup

for i := 0; i < 5; i++ {
    wg.Add(1)  // 计数器 +1
    go func(id int) {
        defer wg.Done()  // 完成时 -1
        fmt.Println("goroutine", id)
    }(i)
}

wg.Wait()  // 阻塞直到计数器为 0
fmt.Println("all done")
```

---

## 第七阶段：标准库与工具链

### 题 13：Group Anagrams（字母异位词分组）

**核心语法点：**

#### 13.1 `sort` 包

```go
import "sort"

// 排序 int 切片
nums := []int{3, 1, 4, 1, 5}
sort.Ints(nums)  // [1, 1, 3, 4, 5]

// 排序 string 切片
strs := []string{"banana", "apple", "cherry"}
sort.Strings(strs)  // ["apple", "banana", "cherry"]

// 自定义排序
sort.Slice(strs, func(i, j int) bool {
    return len(strs[i]) < len(strs[j])
})

// 排序 []byte
b := []byte("cba")
sort.Slice(b, func(i, j int) bool {
    return b[i] < b[j]
})  // ['a', 'b', 'c']

// 二分查找（要求切片已排序）
idx := sort.SearchInts(nums, 3)  // 返回 3 应该插入的位置
idx := sort.Search(len(nums), func(i int) bool {
    return nums[i] >= 3
})
```

#### 13.2 匿名函数与闭包

```go
// 匿名函数（立即执行）
func() {
    fmt.Println("I'm anonymous")
}()

// 赋值给变量
add := func(a, b int) int {
    return a + b
}
fmt.Println(add(3, 4))  // 7

// 闭包：函数捕获外部变量
func makeCounter() func() int {
    count := 0
    return func() int {
        count++      // 捕获了外部的 count
        return count
    }
}

counter := makeCounter()
fmt.Println(counter())  // 1
fmt.Println(counter())  // 2
fmt.Println(counter())  // 3
```

---

### 题 14：Binary Search（二分查找）

**核心语法点：**

#### 14.1 `defer` 延迟执行

```go
// defer 在函数返回前执行（LIFO 栈顺序）
func example() {
    defer fmt.Println("first defer")
    defer fmt.Println("second defer")
    fmt.Println("normal")
}
// 输出：normal -> second defer -> first defer

// 常用场景：关闭文件
func readFile(path string) error {
    f, err := os.Open(path)
    if err != nil {
        return err
    }
    defer f.Close()  // 保证文件一定会关闭

    // 读取文件...
    return nil
}

// defer 的参数在声明时就求值
func tricky() {
    x := 1
    defer fmt.Println(x)  // x=1 已经被捕获
    x = 2
}
// 输出：1（不是 2！）
```

#### 14.2 `strconv` 包

```go
import "strconv"

// int <-> string
s := strconv.Itoa(42)          // "42"
n, _ := strconv.Atoi("42")     // 42

// 各种进制转换
strconv.FormatInt(255, 16)     // "ff"
strconv.FormatInt(255, 2)      // "11111111"

// Parse 系列（返回 error）
n, err := strconv.ParseInt("42", 10, 64)

// bool <-> string
strconv.FormatBool(true)       // "true"
b, _ := strconv.ParseBool("true") // true
```

#### 14.3 `sort.Search` 二分查找

```go
// 标准库自带二分查找
func search(nums []int, target int) int {
    idx := sort.Search(len(nums), func(i int) bool {
        return nums[i] >= target
    })
    if idx < len(nums) && nums[idx] == target {
        return idx
    }
    return -1
}
```

---

## 附录 A：Go 常用命令速查

```bash
# 运行
go run main.go

# 构建
go build -o app main.go

# 格式化代码
go fmt ./...

# 代码检查
go vet ./...

# 运行测试
go test ./...

# 查看文档
go doc fmt.Println

# 初始化模块
go mod init example.com/myproject

# 添加依赖
go get github.com/gin-gonic/gin
```

---

## 附录 B：零值速查表

| 类型 | 零值 |
|------|------|
| `int`, `float64` 等数值 | `0` |
| `bool` | `false` |
| `string` | `""` |
| 指针 `*T` | `nil` |
| `slice` `[]T` | `nil` |
| `map` `map[K]V` | `nil` |
| `channel` `chan T` | `nil` |
| `interface` | `nil` |
| `func` | `nil` |

---

## 学习节奏建议

| 阶段 | 天数 | 题目 | 重点 |
|------|------|------|------|
| 一 | 2 天 | Two Sum + Palindrome | `var`/`:=`、`for`、`map`、`if` |
| 二 | 2 天 | Reverse + Common Prefix | `slice`、`[]byte`、`strings`、`rune` |
| 三 | 2 天 | Anagram + First Unique | `make`、`comma ok`、`delete` |
| 四 | 3 天 | Reverse List + Merge List | 指针、`struct`、递归 |
| 五 | 3 天 | Queue + Min Stack | 方法、`interface`、`error` |
| 六 | 3 天 | Print in Order + FooBar | goroutine、channel、`select` |
| 七 | 2 天 | Group Anagrams + Binary Search | `sort`、`defer`、`strconv`、闭包 |

> **总计约 17 天**，每天 1-2 小时即可完成。
