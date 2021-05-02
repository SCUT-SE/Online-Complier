test = new Map();
test[123]=[12];
test[123].push(2);
test[1234]=[123,45];
// delete test[1234];
for (const [key, value] of Object.entries(test)) {
    console.log(`${typeof(key)}: ${value}`);
}
  console.log(Object.keys(test).sort()); // ["0", "1", "2"]