// first replace removes text-mask's underscores, second fixes like: '2//'
export default (value) => value.replace(/[,_$]/g, '').replace('//', '/')
