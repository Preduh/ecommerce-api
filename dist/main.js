"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _morgan = /*#__PURE__*/ _interop_require_default(require("morgan"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
app.use((0, _morgan.default)("dev"));
app.get("/", (req, res)=>{
    res.json({
        message: "Hello Preduh!"
    });
});
const port = Number(process.env.PORT ?? 8080);
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnXHJcbmltcG9ydCBtb3JnYW4gZnJvbSAnbW9yZ2FuJ1xyXG5cclxuY29uc3QgYXBwID0gZXhwcmVzcygpXHJcblxyXG5hcHAudXNlKG1vcmdhbignZGV2JykpXHJcblxyXG5hcHAuZ2V0KCcvJywgKHJlcSwgcmVzKSA9PiB7XHJcbiAgcmVzLmpzb24oe1xyXG4gICAgbWVzc2FnZTogJ0hlbGxvIFByZWR1aCEnXHJcbiAgfSlcclxufSlcclxuXHJcbmNvbnN0IHBvcnQgPSBOdW1iZXIocHJvY2Vzcy5lbnYuUE9SVCA/PyA4MDgwKVxyXG5cclxuYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiB7XHJcbiAgY29uc29sZS5sb2coYFNlcnZlciBpcyBydW5uaW5nIG9uIHBvcnQgJHtwb3J0fWApXHJcbn0pXHJcbiJdLCJuYW1lcyI6WyJhcHAiLCJleHByZXNzIiwidXNlIiwibW9yZ2FuIiwiZ2V0IiwicmVxIiwicmVzIiwianNvbiIsIm1lc3NhZ2UiLCJwb3J0IiwiTnVtYmVyIiwicHJvY2VzcyIsImVudiIsIlBPUlQiLCJsaXN0ZW4iLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7O2dFQUFvQjsrREFDRDs7Ozs7O0FBRW5CLE1BQU1BLE1BQU1DLElBQUFBLGdCQUFPO0FBRW5CRCxJQUFJRSxHQUFHLENBQUNDLElBQUFBLGVBQU0sRUFBQztBQUVmSCxJQUFJSSxHQUFHLENBQUMsS0FBSyxDQUFDQyxLQUFLQyxNQUFRO0lBQ3pCQSxJQUFJQyxJQUFJLENBQUM7UUFDUEMsU0FBUztJQUNYO0FBQ0Y7QUFFQSxNQUFNQyxPQUFPQyxPQUFPQyxRQUFRQyxHQUFHLENBQUNDLElBQUksSUFBSTtBQUV4Q2IsSUFBSWMsTUFBTSxDQUFDTCxNQUFNLElBQU07SUFDckJNLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLDBCQUEwQixFQUFFUCxLQUFLLENBQUM7QUFDakQifQ==