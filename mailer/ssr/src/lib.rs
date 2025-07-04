use libc::c_char;
use std::ffi::{CStr, CString};
use rusty_v8 as v8;
use std::sync::Once;

static START: Once = Once::new();

fn init_v8() {
    START.call_once(|| {
        v8::V8::initialize_platform(v8::new_default_platform(0, false).make_shared());
        v8::V8::initialize();
    });
}

#[no_mangle]
pub extern "C" fn render_react_email(props_json: *const c_char) -> *mut c_char {
    init_v8();

    let isolate = &mut v8::Isolate::new(Default::default());
    let handle_scope = &mut v8::HandleScope::new(isolate);
    let context = v8::Context::new(handle_scope);
    let scope = &mut v8::ContextScope::new(handle_scope, context);

    let code = std::fs::read_to_string("src/bundle.js").unwrap();
    let script = v8::String::new(scope, &code).unwrap();
    v8::Script::compile(scope, script, None).unwrap().run(scope).unwrap();

    let c_str = unsafe { CStr::from_ptr(props_json) };
    let props_str = c_str.to_str().unwrap();
    let js_props = v8::String::new(scope, props_str).unwrap();
    let global = context.global(scope);

    let render_email_key = v8::String::new(scope, "renderEmail").unwrap();
    let render_fn_val = global.get(scope, render_email_key.into()).unwrap();
    let render_fn = v8::Local::<v8::Function>::try_from(render_fn_val).unwrap();

    let json = v8::json::parse(scope, js_props).unwrap();
    let args = [json];
    let result = render_fn.call(scope, global.into(), &args).unwrap();
    let result_str = result.to_string(scope).unwrap().to_rust_string_lossy(scope);

    CString::new(result_str).unwrap().into_raw()
}