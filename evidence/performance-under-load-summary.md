# Performance Under Load — Summary

**Result:** ✅ PASS

**Success rate:** 100.00% (threshold ≥ 98.00%)

---

## Overall statistics
- Total requests: **364**
- Failed requests: **0**
- Approx. request rate: **50 req/s**

## Latency (http.response_time)
- p50: 2 ms
- p95: 19.1 ms
- p99: 26.8 ms
- max: 31 ms

## Per-endpoint latency (by request name)

| Endpoint | Count | Mean | p95 | p99 | Max |
|---|---:|---:|---:|---:|---:|
| health | 56 | 0.4 ms | 1 ms | 1 ms | 7 ms |
| register | 44 | 2.6 ms | 3 ms | 4 ms | 27 ms |
| login | 44 | 20.3 ms | 26.8 ms | 27.9 ms | 31 ms |
| place-order | 44 | 3.6 ms | 5 ms | 6 ms | 6 ms |
| users | 44 | 2 ms | 3 ms | 3 ms | 3 ms |
| orders | 44 | 2.4 ms | 3 ms | 5 ms | 22 ms |
| update-order | 44 | 2.8 ms | 4 ms | 4 ms | 6 ms |
| delete-order | 44 | 2.3 ms | 3 ms | 3 ms | 5 ms |
