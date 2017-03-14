import BaseController from '../lib/BaseController';
import IndexService from '../service/indexService';

class Index extends BaseController{

    constructor(req, res) {
        super(req, res);
        this.indexService = new IndexService();
    }

    index() {

        //this.renderJson(this.params);
        const data = {};
        data.message = this.indexService.getMessage();
        this.render('index/index', data);
    };

}

export default Index;