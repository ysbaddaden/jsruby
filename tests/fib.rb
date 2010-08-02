
# (n, F_{n-1}, F_n)
def fibo(n, fn1 = 1, fn = 0)
  if n == 0
    fn
  else
    fibo(n - 1, fn, fn + fn1)
  end
end

