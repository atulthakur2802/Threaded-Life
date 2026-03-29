// Test script for checkout validation
// This simulates edge cases for the checkout form

const testCases = [
  {
    name: "Valid checkout data",
    data: {
      fullName: "John Doe",
      address: "123 Main St, Apt 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400001",
      phone: "9876543210"
    },
    shouldPass: true
  },
  {
    name: "Empty name",
    data: {
      fullName: "",
      address: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400001",
      phone: "9876543210"
    },
    shouldPass: false
  },
  {
    name: "Short name",
    data: {
      fullName: "A",
      address: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400001",
      phone: "9876543210"
    },
    shouldPass: false
  },
  {
    name: "Empty address",
    data: {
      fullName: "John Doe",
      address: "",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400001",
      phone: "9876543210"
    },
    shouldPass: false
  },
  {
    name: "Short address",
    data: {
      fullName: "John Doe",
      address: "123",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400001",
      phone: "9876543210"
    },
    shouldPass: false
  },
  {
    name: "Empty city",
    data: {
      fullName: "John Doe",
      address: "123 Main St",
      city: "",
      state: "Maharashtra",
      pinCode: "400001",
      phone: "9876543210"
    },
    shouldPass: false
  },
  {
    name: "Invalid PIN code - letters",
    data: {
      fullName: "John Doe",
      address: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "ABCDEF",
      phone: "9876543210"
    },
    shouldPass: false
  },
  {
    name: "Invalid PIN code - too short",
    data: {
      fullName: "John Doe",
      address: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "12345",
      phone: "9876543210"
    },
    shouldPass: false
  },
  {
    name: "Invalid PIN code - too long",
    data: {
      fullName: "John Doe",
      address: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "1234567",
      phone: "9876543210"
    },
    shouldPass: false
  },
  {
    name: "Invalid phone - letters",
    data: {
      fullName: "John Doe",
      address: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400001",
      phone: "abcdefghij"
    },
    shouldPass: false
  },
  {
    name: "Invalid phone - too short",
    data: {
      fullName: "John Doe",
      address: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400001",
      phone: "123456789"
    },
    shouldPass: false
  },
  {
    name: "Invalid phone - too long",
    data: {
      fullName: "John Doe",
      address: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400001",
      phone: "123456789012"
    },
    shouldPass: false
  },
  {
    name: "Phone with country code",
    data: {
      fullName: "John Doe",
      address: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400001",
      phone: "+91 9876543210"
    },
    shouldPass: true
  },
  {
    name: "XSS attempt in name",
    data: {
      fullName: "<script>alert('xss')</script>",
      address: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400001",
      phone: "9876543210"
    },
    shouldPass: false
  },
  {
    name: "SQL injection attempt",
    data: {
      fullName: "'; DROP TABLE users; --",
      address: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400001",
      phone: "9876543210"
    },
    shouldPass: false
  }
];

// Validation function (copied from CheckoutClient)
function validateShippingAddress(shippingAddress = {}) {
  const fullName = shippingAddress.fullName?.trim();
  const address = shippingAddress.address?.trim();
  const city = shippingAddress.city?.trim();
  const pinCode = shippingAddress.pinCode?.trim();
  const phone = shippingAddress.phone?.trim();

  if (!fullName || fullName.length < 2) {
    return 'Please enter the recipient full name';
  }

  if (!address || address.length < 8) {
    return 'Please enter a complete street address';
  }

  if (!city) {
    return 'Please enter the delivery city';
  }

  if (!/^\d{6}$/.test(pinCode ?? '')) {
    return 'PIN code must be 6 digits';
  }

  if (!/^(\+91[\s-]?)?\d{10}$/.test(phone ?? '')) {
    return 'Phone number must be 10 digits';
  }

  return null;
}

// Run tests
console.log("🧪 Running Checkout Validation Tests...\n");

let passed = 0;
let failed = 0;

testCases.forEach((testCase, index) => {
  const result = validateShippingAddress(testCase.data);
  const passedTest = result === null ? testCase.shouldPass : !testCase.shouldPass;
  
  if (passedTest) {
    console.log(`✅ Test ${index + 1}: ${testCase.name} - PASSED`);
    passed++;
  } else {
    console.log(`❌ Test ${index + 1}: ${testCase.name} - FAILED`);
    console.log(`   Expected: ${testCase.shouldPass ? 'Should pass' : 'Should fail'}`);
    console.log(`   Got: ${result || 'Passed validation'}`);
    failed++;
  }
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${testCases.length} tests`);
console.log(`🎯 Success Rate: ${Math.round((passed / testCases.length) * 100)}%`);
