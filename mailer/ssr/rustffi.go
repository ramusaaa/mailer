package ssr

/*
#include <stdlib.h>
char* render_react_email(const char*);
#cgo LDFLAGS: -L${SRCDIR}/target/release -lreactssr
*/
import "C"
import (
	"encoding/json"
	"unsafe"
)

func RenderReactComponent(props map[string]interface{}) (string, error) {
	b, _ := json.Marshal(props)
	cprops := C.CString(string(b))
	defer C.free(unsafe.Pointer(cprops))
	result := C.render_react_email(cprops)
	defer C.free(unsafe.Pointer(result))
	return C.GoString(result), nil
}
