import Post from './models/post';

export default function createFakeData(){
    const posts = [...Array(40).keys()].map(i => ({
        title : `post #${i}`,
        body : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet ante sit amet dolor imperdiet scelerisque. Nunc egestas nunc vitae vestibulum aliquet. Donec tempor mollis lacus, et dictum tellus consectetur ut. Praesent sit amet pulvinar tellus. Integer vitae pretium ex. Morbi tempus nisl ut mi efficitur, non finibus dui dapibus. Aliquam odio lectus, sodales ac sollicitudin vel, elementum eu enim. Integer erat lacus, ullamcorper sit amet pulvinar ac, viverra a lacus. Nulla congue blandit ligula, in laoreet magna gravida sit amet. Curabitur pretium in tortor quis iaculis. Donec tellus augue, dapibus id justo non, volutpat condimentum nisl. In auctor quis augue non dictum. Nullam accumsan luctus aliquam. Vivamus ut ante sit amet lorem elementum consequat id ut purus.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam orci urna, tincidunt nec nibh a, pellentesque sollicitudin purus. Sed finibus sodales mauris ac lobortis. Curabitur aliquam augue vel velit ultricies convallis. Praesent et tincidunt sapien. Suspendisse potenti. Aliquam erat volutpat. Donec leo velit, pellentesque sollicitudin laoreet vel, egestas non eros. Proin mauris nisl, condimentum eget fermentum sed, tristique nec erat. Donec aliquam accumsan mi quis posuere. Quisque nec augue congue, posuere arcu a, posuere mauris. Nunc tincidunt nisi et massa pretium ultrices. Maecenas commodo gravida eros vitae consectetur. Donec erat risus, varius non dapibus sit amet, iaculis vel tellus. Donec velit erat, auctor quis orci sit amet, condimentum mattis quam.

Donec eleifend, diam sit amet sodales euismod, metus felis consequat nibh, eget commodo felis nunc non erat. Cras a orci sed eros fringilla convallis in vitae nulla. Mauris eu efficitur enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce id nisl odio. Fusce mollis erat quis augue tristique, non laoreet mauris lobortis. Vivamus venenatis vulputate purus vel imperdiet. Curabitur eu.

`,
        tags : ['fake, data'],
    }));

    Post.insertMany(posts,(err,docs)=>{
    });
}
