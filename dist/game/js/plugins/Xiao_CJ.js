//==============================================================================================================
// * SECTION A.01: Global Variables
//   - DO NOT MODIFY!!!!
//==============================================================================================================

var Imported = Imported || {};
Imported.mushFeatures = Imported.mushFeatures || {};
Imported.mushFeatures["AchievementSystem_P1"] = 1.06;
var $mushFeatures = $mushFeatures || {
  "imported": {},
  "params": {}
};
$mushFeatures.imported["AchievementSystem_P1"] = 1.06;
function MUSH_Achievements() {
  this.initialize.apply(this, arguments);
}
MUSH_Achievements.prototype.initialize = function () {
  this.createSceneDetails();
  this.createAchievementsList();
};
MUSH_Achievements.prototype.createSceneDetails = function () {
  this._snDetails = {};
  this._snDetails.addToMenu = false;
  this._snDetails.switchForAch = -1;
  this._snDetails.textPop = "Thành tựu đạt thành: ";
  this._snDetails.allowPopWindow = true;
  this._snDetails.wPopWidth = 720;
  this._snDetails.wPopColor1 = "rgba(10, 10, 10, 0.2)";
  this._snDetails.wPopColor2 = "rgba(20, 20, 20, 0.1)";
  this._snDetails.wPopPeriod = 30;
  this._snDetails.defaultSceneView = 2;
  this._snDetails.sceneToggle = true;
  this._snDetails.sceneTitle = "Thành tựu ban thưởng";
  this._snDetails.sceneDescription = "Thông tin chi tiết";
  this._snDetails.iconNotUnlocked = 17;
  this._snDetails.spriteNotUnlocked = "CJMB_0";
  this._snDetails.textColorNotUnlocked = 7;
  this._snDetails.textCompletion = "Thành tựu tiến độ: ";
  this._snDetails.completionColor1 = "rgba(0, 255, 0, 1)";
  this._snDetails.completionColor2 = "rgba(35, 105, 35, 1)";
  this._snDetails.logoSize = 50;
  this._snDetails.showReward = true;
  this._snDetails.textReward = "Thành tựu ban thưởng: ";
  this._snDetails.textNoReward = "None";
  this._snDetails.heightFactor = 3;
};
MUSH_Achievements.prototype.createAchievementsList = function () {
  var achList = [
  //       	"0/1/3"    = Receive item #1 from the database 3 times.
  //       	"1/5/1"    = Receive armor #5 from the database once.
  //          "2/10/5"   = Receive weapon #10 from the database 5 times.	
  //          "3/0/1000" = Receive 1000 gold.
  //          "-1/0/0"   = No reward
  //
  //   - condition: Sets the condition for gaining the achievement. Format: "type/value1/value2"
  //     + type 0 (for switches): If type = 0, the condition for earning the achievement is the activation
  //                              of a game switch, which number is specified by value1. So for example:
  //                              "0/5/0" = If game switch #5 == ON. Value2 isn't used here.
  //     + type 1 (for variables ==) If type = 1, the condition for earning the achievement is set by a game
  //                                 variables being equal to a value. Value1 determines the game variable and 
  //                                 value 2 determines the value to which its being compared to.
  //                                 Example: "1/3/10" = if variable #3 == 10.
  //     + type 2 (for variables >=) If type = 2, the condition for earning the achievement is set by a game
  //                                 variables being equal or greater to a value. Value1 determines the game variable and 
  //                                 value 2 determines the value to which its being compared to.
  //                                 Example: "2/7/12" = if variable #3 >= 10.
  //     + type 3 (for game time) The condition here is game playtime in frames. If the playtime in frames is greater
  //                              or equal to value1, the achievement is gained. Value2 has no incidence. So for example:
  //                              "3/3600/0" = if playtime >= 3600 frames, so if the player played 1 hour or more.
  //     + type 4 (for steps) The condition here is the number of steps the player took. Value1 determines the number of
  //                          steps necessary to gain the achievement. Value2 has no incidence. So for example:
  //                          "4/1000/0" = if player took 1000 steps or more.
  //-------------------------------------------------------------------------------
  //-----绿-------------------------------------------------------------------------------------------------------
  ["Sơ nhập giang hồ", 0, "CJA_1", "Thành công sống tiếp được", "-1/0/0", "0/21/0", false, false, false], ["Kỳ phùng địch thủ", 0, "CJA_2", "Thế cuộc đánh cờ bên trong đạt được thắng lợi", "-1/0/0", "0/25/0", false, false, false], ["Có thể phân biệt thật giả", 0, "CJA_3", "Thành công phân biệt ra đồ cổ", "-1/0/0", "0/29/0", false, false, false], ["Tri âm", 0, "CJA_4", "Thành công nghe ra chỗ đánh đàn âm", "-1/0/0", "0/33/0", false, false, false], ["Mặc bảo", 0, "CJA_5", "Thành công hoàn thành thư hoạ giám thưởng", "-1/0/0", "0/37/0", false, false, false], ["Khắc địch chế thắng", 0, "CJA_6", "Lần đầu quyết đấu đạt được thắng lợi", "-1/0/0", "0/61/0", false, false, false], ["Cờ kém một nước", 0, "SBA_1", "Thế cuộc đánh cờ thất bại 50 Lần", "-1/0/0", "0/65/0", false, false, false], ["Ngũ âm không được đầy đủ", 0, "SBA_2", "Nghe không ra chỗ đánh đàn âm 50 Lần", "-1/0/0", "0/66/0", false, false, false], ["Dốt đặc cán mai", 0, "SBA_3", "Thư hoạ giám thưởng thất bại 50 Lần", "-1/0/0", "0/67/0", false, false, false], ["Đục lỗ", 0, "SBA_4", "Phân biệt đồ cổ thất bại 50 Lần", "-1/0/0", "0/68/0", false, false, false], ["Khi thắng khi bại", 0, "SBA_5", "Quyết đấu thất bại 50 Lần", "-1/0/0", "0/69/0", false, false, false], ["Khám phá hồng trần", 0, "TSA_1", "Đối giữa trần thế không tại lưu luyến, xuất gia vì tăng", "-1/0/0", "0/70/0", false, false, false], ["Bái sư học nghệ", 0, "TSA_2", "Thành công bái giang hồ Võ sư học nghệ", "-1/0/0", "0/71/0", false, false, false], ["Ngũ bộ xà", 0, "TSA_3", "Bị rắn độc cắn chết", "-1/0/0", "0/100/0", false, false, false], ["Hổ ăn", 0, "TSA_4", "Bị lão hổ cắn chết", "-1/0/0", "0/122/0", false, false, false], ["Thân thể bị móc sạch", 0, "TSA_5", "Bị tiểu thâu trộm đi đồ vật", "-1/0/0", "0/123/0", false, false, false], ["Giá!", 0, "TSA_6", "Thuần phục một con ngựa", "-1/0/0", "0/124/0", false, false, false], ["Đọc đủ thứ thi thư", 0, "TSA_7", "Lập chí học hành gian khổ khảo công tên", "-1/0/0", "0/127/0", false, false, false], ["Thương nhân buôn vải", 0, "TSA_8", "Lập chí muốn mở một gian bố trang", "-1/0/0", "0/128/0", false, false, false], ["Thợ rèn", 0, "TSA_9", "Lập chí trở thành thợ rèn", "-1/0/0", "0/129/0", false, false, false], ["Thợ săn", 0, "TSA_10", "Lập chí trở thành thợ săn", "-1/0/0", "0/130/0", false, false, false], ["Thợ mộc", 0, "TSA_11", "Lập chí trở thành thợ mộc", "-1/0/0", "0/131/0", false, false, false], ["Thợ mỏ", 0, "TSA_12", "Lập chí trở thành thợ mỏ", "-1/0/0", "0/132/0", false, false, false], ["Ngư dân", 0, "TSA_13", "Lập chí trở thành ngư dân", "-1/0/0", "0/133/0", false, false, false], ["Túc trí đa mưu", 0, "TSA_14", "Thu hoạch được người nhiều mưu trí xưng hào", "-1/0/0", "0/231/0", false, false, false], ["Bất nam bất nữ", 0, "TSA_15", "Bề ngoài trở nên nam nữ không phân", "-1/0/0", "0/233/0", false, false, false], ["Thanh xuân mãi mãi", 0, "TSA_16", "Ngươi bề ngoài sẽ không lộ ra rất già", "-1/0/0", "0/235/0", false, false, false], ["Gian thương", 0, "TSA_17", "Trở thành một gian thương", "-1/0/0", "0/236/0", false, false, false], ["Tiểu thâu", 0, "TSA_18", "Trộm cắp một kiện vật phẩm", "-1/0/0", "0/237/0", false, false, false],
  //----- Lam -----------------------------------------
  ["Sơ khuy môn kính", 0, "CJB_1", "Mở lại nhân sinh vượt qua 50 Lần", "-1/0/0", "0/22/0", false, false, false], ["Đen trắng tử", 0, "CJB_2", "Thế cuộc đánh cờ chiến thắng 50 Lần", "-1/0/0", "0/26/0", false, false, false], ["Tuệ nhãn biết châu", 0, "CJB_3", "Thành công phân biệt ra đồ cổ 50 Lần", "-1/0/0", "0/30/0", false, false, false], ["Ngũ âm đầy đủ", 0, "CJB_4", "Thành công nghe ra chỗ đánh đàn âm 50 Lần", "-1/0/0", "0/34/0", false, false, false], ["Điểm chỉ đồng ý", 0, "CJB_5", "Thành công hoàn thành thư hoạ giám thưởng 50 Lần", "-1/0/0", "0/38/0", false, false, false], ["Khó gặp địch thủ", 0, "CJA_6", "Quyết đấu đạt được thắng lợi 50 Lần", "-1/0/0", "0/62/0", false, false, false], ["Thiếu Lâm tự đệ tử", 0, "TSB_1", "Thành công gia nhập Thiếu Lâm tự", "-1/0/0", "0/72/0", false, false, false], ["Phái Hoa Sơn đệ tử", 0, "TSB_2", "Thành công gia nhập phái Hoa Sơn", "-1/0/0", "0/73/0", false, false, false], ["Phái Võ Đang đệ tử", 0, "TSB_3", "Thành công gia nhập phái Võ Đang", "-1/0/0", "0/74/0", false, false, false], ["Toàn Chân giáo đệ tử", 0, "TSB_4", "Thành công gia nhập Toàn Chân giáo", "-1/0/0", "0/75/0", false, false, false], ["Phái Thái Sơn đệ tử", 0, "TSB_5", "Thành công gia nhập phái Thái Sơn", "-1/0/0", "0/76/0", false, false, false], ["Thiết Kiếm Môn đệ tử", 0, "TSB_6", "Thành công gia nhập Thiết Kiếm Môn", "-1/0/0", "0/77/0", false, false, false], ["Phái Cổ Mộ đệ tử", 0, "TSB_7", "Thành công gia nhập phái Cổ Mộ", "-1/0/0", "0/78/0", false, false, false], ["Hồng Hoa hội đệ tử", 0, "TSB_8", "Thành công gia nhập Hồng Hoa hội", "-1/0/0", "0/79/0", false, false, false], ["Đào Hoa đảo đệ tử", 0, "TSB_9", "Thành công gia nhập Đào Hoa đảo", "-1/0/0", "0/80/0", false, false, false], ["Phái Nga Mi đệ tử", 0, "TSB_10", "Thành công gia nhập phái Nga Mi", "-1/0/0", "0/81/0", false, false, false], ["Nhật Nguyệt thần giáo đệ tử", 0, "TSB_11", "Thành công gia nhập Nhật Nguyệt thần giáo", "-1/0/0", "0/82/0", false, false, false], ["Đường Môn đệ tử", 0, "TSB_12", "Thành công gia nhập Đường Môn", "-1/0/0", "0/83/0", false, false, false], ["Đệ tử Cái Bang", 0, "TSB_13", "Thành công gia nhập Cái Bang", "-1/0/0", "0/84/0", false, false, false], ["Ngũ Độc giáo đệ tử", 0, "TSB_14", "Thành công gia nhập Ngũ Độc giáo", "-1/0/0", "0/85/0", false, false, false], ["Phái Thanh Thành đệ tử", 0, "TSB_15", "Thành công gia nhập phái Thanh Thành", "-1/0/0", "0/86/0", false, false, false], ["Thiết chưởng giúp đệ tử", 0, "TSB_16", "Thành công gia nhập thiết chưởng giúp", "-1/0/0", "0/87/0", false, false, false], ["Thiên Long tự đệ tử", 0, "TSB_17", "Thành công gia nhập Thiên Long tự", "-1/0/0", "0/88/0", false, false, false], ["Trường Nhạc bang đệ tử", 0, "TSB_18", "Thành công gia nhập Trường Nhạc bang", "-1/0/0", "0/89/0", false, false, false], ["Linh Thứu cung đệ tử", 0, "TSB_19", "Thành công gia nhập Linh Thứu cung", "-1/0/0", "0/90/0", false, false, false], ["Dược vương môn đệ tử", 0, "TSB_20", "Thành công gia nhập dược vương môn", "-1/0/0", "0/91/0", false, false, false], ["Phái Không Động đệ tử", 0, "TSB_21", "Thành công gia nhập phái Không Động", "-1/0/0", "0/92/0", false, false, false], ["Côn Luân phái đệ tử", 0, "TSB_22", "Thành công gia nhập Côn Luân phái", "-1/0/0", "0/93/0", false, false, false], ["Tiêu Dao phái đệ tử", 0, "TSB_23", "Thành công gia nhập Tiêu Dao phái", "-1/0/0", "0/94/0", false, false, false], ["Huyết Đao môn đệ tử", 0, "TSB_24", "Thành công gia nhập Huyết Đao môn", "-1/0/0", "0/95/0", false, false, false], ["Tinh Tú phái đệ tử", 0, "TSB_25", "Thành công gia nhập Tinh Tú phái", "-1/0/0", "0/96/0", false, false, false], ["Minh giáo đệ tử", 0, "TSB_26", "Thành công gia nhập Minh giáo", "-1/0/0", "0/97/0", false, false, false], ["Di Hoa Cung đệ tử", 0, "TSB_27", "Thành công gia nhập Di Hoa Cung", "-1/0/0", "0/98/0", false, false, false], ["Thần Long giáo đệ tử", 0, "TSB_28", "Thành công gia nhập Thần Long giáo", "-1/0/0", "0/99/0", false, false, false], ["Hổ khẩu thoát hiểm", 0, "TSB_29", "Thành công từ lão hổ trước mặt đào tẩu", "-1/0/0", "0/121/0", false, false, false], ["Trốn chỗ nào?", 0, "TSB_30", "Thành công bắt lấy chạy trốn khâu Thiên Bá", "-1/0/0", "0/125/0", false, false, false], ["Xe chỉ luồn kim", 0, "TSB_31", "Thành công chế tạo ra một kiện đồ phòng ngự", "-1/0/0", "0/134/0", false, false, false], ["Thiên chuy bách luyện", 0, "TSB_32", "Thành công rèn đúc ra một thanh vũ khí", "-1/0/0", "0/135/0", false, false, false], ["Xung phong đi đầu", 0, "TSB_33", "Thành công tham quân tiến vào quân doanh", "-1/0/0", "0/197/0", false, false, false], ["Tú tài", 0, "TSB_34", "Tham gia khoa cử thi đậu tú tài", "-1/0/0", "0/198/0", false, false, false], ["Tiên phong đạo cốt", 0, "TSB_35", "Khai ngộ sau nhập đạo tu hành", "-1/0/0", "0/224/0", false, false, false], ["Tóc trắng lưu danh", 0, "TSB_36", "Thu hoạch được một cái liên quan tới tóc trắng xưng hào", "-1/0/0", "0/225/0", false, false, false], ["Hiệp khách", 0, "TSB_37", "Trở thành trong giang hồ nổi danh nam hiệp", "-1/0/0", "0/226/0", false, false, false], ["Hiệp nữ", 0, "TSB_38", "Trở thành trong giang hồ nổi danh nữ hiệp", "-1/0/0", "0/227/0", false, false, false], ["Thiên hạ đệ nhất đẹp", 0, "TSB_39", "Thu hoạch được thiên hương các xếp hạng thứ nhất", "-1/0/0", "0/232/0", false, false, false], ["Mỡ", 0, "TSB_40", "Lớn một thân mỡ", "-1/0/0", "0/234/0", false, false, false],
  //----- Tử -----------------------------------------
  ["Lão giang hồ", 0, "CJC_1", "Mở lại nhân sinh vượt qua 150 Lần", "-1/0/0", "0/23/0", false, false, false], ["Nôn ra máu tử", 0, "CJC_2", "Cùng người thế cuộc đánh cờ 150 Lần", "-1/0/0", "0/27/0", false, false, false], ["Người thu thập", 0, "CJC_3", "Tham dự phân biệt đồ cổ 150 Lần", "-1/0/0", "0/31/0", false, false, false], ["Dư âm còn văng vẳng bên tai", 0, "CJC_4", "Cùng người giao lưu cầm nghệ 150 Lần", "-1/0/0", "0/35/0", false, false, false], ["Bút tinh mực diệu", 0, "CJC_5", "Tham dự thư hoạ giám thưởng 150 Lần", "-1/0/0", "0/39/0", false, false, false], ["Thân kinh bách chiến", 0, "CJA_6", "Tiến hành qua quyết đấu 100 Lần", "-1/0/0", "0/63/0", false, false, false], ["Học trộm học nghệ", 0, "TSC_1", "Học trộm đến cao thủ võ công tuyệt thế", "-1/0/0", "0/126/0", false, false, false], ["Tam bản phủ", 0, "TSC_2", "Lên núi chặt cây cây cối 100 Lần", "-1/0/0", "0/136/0", false, false, false], ["Đào sâu ba thước", 0, "TSC_3", "Vào động đào móc khoáng thạch 100 Lần", "-1/0/0", "0/138/0", false, false, false], ["Câu tẩu", 0, "TSC_4", "Đến bờ sông câu cá 100 Lần", "-1/0/0", "0/140/0", false, false, false], ["Thợ săn", 0, "TSC_5", "Đến núi rừng bên trong đi săn 100 Lần", "-1/0/0", "0/182/0", false, false, false], ["Kim chùy tượng", 0, "TSC_6", "Rèn đúc binh khí 100 Lần", "-1/0/0", "0/184/0", false, false, false], ["Kim châm", 0, "TSC_7", "May trang bị 100 Lần", "-1/0/0", "0/186/0", false, false, false], ["Âm dương nhân", 0, "TSC_8", "Trở thành một cái không có giới tính người", "-1/0/0", "0/189/0", false, false, false], ["Tình hoa chi độc", 0, "TSC_9", "Thân trúng tình hoa kịch độc", "-1/0/0", "0/190/0", false, false, false], ["Kiến công lập nghiệp", 0, "TSC_10", "Tham quân sau đạt được đề bạt, thăng làm tướng quân", "-1/0/0", "0/196/0", false, false, false], ["Thám Hoa", 0, "TSC_11", "Tham gia khoa cử thi đậu Thám Hoa", "-1/0/0", "0/199/0", false, false, false], ["Bộ đầu", 0, "TSC_12", "Tại trong nha môn lên làm bộ đầu", "-1/0/0", "0/222/0", false, false, false], ["Thiên hạ đệ nhất xấu", 0, "TSC_13", "Bề ngoài xấu tới cực điểm", "-1/0/0", "0/229/0", false, false, false], ["Hùng ưng", 0, "TSC_14", "Trở thành Mông Cổ Khả Hãn", "-1/0/0", "0/230/0", false, false, false], ["Đông Tà", 0, "TSC_15", "Tại Hoa Sơn Luận Kiếm sau thu hoạch được Đông Tà xưng hào", "-1/0/0", "0/274/0", false, false, false], ["Tây Độc", 0, "TSC_16", "Tại Hoa Sơn Luận Kiếm sau thu hoạch được Tây Độc xưng hào", "-1/0/0", "0/275/0", false, false, false], ["Nam Đế", 0, "TSC_17", "Tại Hoa Sơn Luận Kiếm sau thu hoạch được Nam Đế xưng hào", "-1/0/0", "0/276/0", false, false, false], ["Bắc Cái", 0, "TSC_18", "Tại Hoa Sơn Luận Kiếm sau thu hoạch được Bắc Cái xưng hào", "-1/0/0", "0/277/0", false, false, false], ["Trung Thần Thông", 0, "TSC_19", "Tại Hoa Sơn Luận Kiếm sau thu hoạch được Trung Thần Thông xưng hào", "-1/0/0", "0/278/0", false, false, false], ["Tây cuồng", 0, "TSC_20", "Tại Hoa Sơn Luận Kiếm sau thu hoạch được tây cuồng xưng hào", "-1/0/0", "0/279/0", false, false, false], ["Nam tăng", 0, "TSC_21", "Tại Hoa Sơn Luận Kiếm sau thu hoạch được nam tăng xưng hào", "-1/0/0", "0/280/0", false, false, false], ["Bắc hiệp", 0, "TSC_22", "Tại Hoa Sơn Luận Kiếm sau thu hoạch được bắc hiệp xưng hào", "-1/0/0", "0/281/0", false, false, false], ["Bên trong ngoan đồng", 0, "TSC_23", "Tại Hoa Sơn Luận Kiếm sau thu hoạch được bên trong ngoan đồng xưng hào", "-1/0/0", "0/282/0", false, false, false], ["Bệnh tim", 0, "TSC_24", "Tử vu tâm tạng bệnh", "-1/0/0", "0/283/0", false, false, false],
  //----- Cam -----------------------------------------
  ["Thế sự xoay vần", 0, "CJD_1", "Mở lại nhân sinh vượt qua 300 Lần", "-1/0/0", "0/24/0", false, false, false], ["Kỳ Thánh", 0, "CJD_2", "Thế cuộc đánh cờ chiến thắng 150 Lần", "-1/0/0", "0/28/0", false, false, false], ["Hoàng kim đồng", 0, "CJD_3", "Thành công phân biệt ra đồ cổ 150 Lần", "-1/0/0", "0/32/0", false, false, false], ["Bá Nha", 0, "CJD_4", "Thành công nghe ra chỗ đánh đàn âm 150 Lần", "-1/0/0", "0/36/0", false, false, false], ["Bút pháp thần kỳ màu vẽ", 0, "CJD_5", "Thành công hoàn thành thư hoạ giám thưởng 150 Lần", "-1/0/0", "0/40/0", false, false, false], ["Vô địch thiên hạ", 0, "CJD_6", "Quyết đấu đạt được thắng lợi 200 Lần", "-1/0/0", "0/64/0", false, false, false], ["Khai Sơn Phủ", 0, "TSD_1", "Lên núi chặt cây cây cối 200 Lần", "-1/0/0", "0/137/0", false, false, false], ["Địa long", 0, "TSD_2", "Vào động đào móc khoáng thạch 200 Lần", "-1/0/0", "0/139/0", false, false, false], ["Lạnh sông độc câu", 0, "TSD_3", "Đến bờ sông câu cá 200 Lần", "-1/0/0", "0/181/0", false, false, false], ["Thiện xạ", 0, "TSD_4", "Đến núi rừng bên trong đi săn 200 Lần", "-1/0/0", "0/183/0", false, false, false], ["Cánh tay Kỳ Lân", 0, "TSD_5", "Rèn đúc binh khí 200 Lần", "-1/0/0", "0/185/0", false, false, false], ["Trời thêu", 0, "TSD_6", "May trang bị 200 Lần", "-1/0/0", "0/187/0", false, false, false], ["Tứ thư Ngũ kinh", 0, "TSD_7", "Tại trong cuộc đời đọc xong Tứ thư Ngũ kinh", "-1/0/0", "0/188/0", false, false, false], ["Ẩn tàng bí mật", 0, "TSD_8", "Ở trong game phát hiện tác giả lưu lại bí mật", "-1/0/0", "0/59/0", false, false, false], ["Thiên hạ đệ nhất", 0, "TSD_9", "Tại võ lâm đại hội bên trong thu hoạch được thiên hạ đệ nhất", "-1/0/0", "0/191/0", false, false, false], ["Miệng vàng lời ngọc", 0, "TSD_10", "Tại trò chơi download bình đài cho trò chơi khen ngợi", "-1/0/0", "0/192/0", false, false, false], ["Kim Xà kiếm", 0, "TSD_11", "Thành công rút ra Kim Xà kiếm", "-1/0/0", "0/193/0", false, false, false], ["Đả cẩu bổng", 0, "TSD_12", "Tìm được Lỗ bang chủ mất đi đả cẩu bổng", "-1/0/0", "0/194/0", false, false, false], ["Trạng Nguyên", 0, "TSD_13", "Tham gia khoa cử thi đậu Trạng Nguyên", "-1/0/0", "0/200/0", false, false, false], ["Khai tông lập phái", 0, "TSD_14", "Mình sáng lập môn phái", "-1/0/0", "0/223/0", false, false, false], ["Nhàn vân dã hạc", 0, "TSD_15", "Vượt qua quy ẩn sơn lâm sinh hoạt", "-1/0/0", "0/228/0", false, false, false], ["Hai mạch Nhâm Đốc", 0, "TSD_16", "Thành công đả thông hai mạch Nhâm Đốc", "-1/0/0", "0/238/0", false, false, false], ["Như Lai Thiên Diệp Thủ", 0, "TSD_17", "Học được cũng thi triển Như Lai Thiên Diệp Thủ", "-1/0/0", "0/241/0", false, false, false], ["Phật môn Sư Tử Hống", 0, "TSD_18", "Học được cũng thi triển phật môn Sư Tử Hống", "-1/0/0", "0/242/0", false, false, false], ["Độc Cô Cửu Kiếm", 0, "TSD_19", "Học được cũng thi triển Độc Cô Cửu Kiếm", "-1/0/0", "0/243/0", false, false, false], ["Thái Cực quyền", 0, "TSD_20", "Học được cũng thi triển Thái Cực quyền", "-1/0/0", "0/244/0", false, false, false], ["Thất Tinh Kiếm pháp", 0, "TSD_21", "Tại Tiên Thiên khí công trạng thái dưới thi triển Thất Tinh Kiếm pháp", "-1/0/0", "0/245/0", false, false, false], ["Bạo Vũ Lê Hoa Châm", 0, "TSD_22", "Học được cũng thi triển Bạo Vũ Lê Hoa Châm", "-1/0/0", "0/246/0", false, false, false], ["Huyết ma đao pháp", 0, "TSD_23", "Học được cũng thi triển huyết ma đao pháp", "-1/0/0", "0/247/0", false, false, false], ["Sinh Tử Phù", 0, "TSD_24", "Học được cũng thi triển Sinh Tử Phù", "-1/0/0", "0/248/0", false, false, false], ["Thiên Sơn Lục Hợp Chưởng", 0, "TSD_25", "Học được cũng thi triển Thiên Sơn Lục Hợp Chưởng", "-1/0/0", "0/249/0", false, false, false], ["Đả Cẩu Bổng Pháp", 0, "TSD_26", "Học được cũng thi triển Đả Cẩu Bổng Pháp", "-1/0/0", "0/250/0", false, false, false], ["Hàng Long Thập Bát Chưởng", 0, "TSD_27", "Học được cũng thi triển Hàng Long Thập Bát Chưởng", "-1/0/0", "0/251/0", false, false, false], ["Quỳ Hoa Bảo Điển", 0, "TSD_28", "Học được cũng thi triển Quỳ Hoa Bảo Điển", "-1/0/0", "0/252/0", false, false, false], ["Hấp Tinh Đại Pháp", 0, "TSD_29", "Học được cũng thi triển Hấp Tinh Đại Pháp", "-1/0/0", "0/253/0", false, false, false], ["Hóa Công đại pháp", 0, "TSD_30", "Học được cũng thi triển Hóa Công đại pháp", "-1/0/0", "0/254/0", false, false, false], ["Kim xà kiếm pháp", 0, "TSD_31", "Học được cũng thi triển kim xà kiếm pháp", "-1/0/0", "0/255/0", false, false, false], ["Ảm Nhiên Tiêu Hồn Chưởng", 0, "TSD_32", "Học được cũng thi triển Ảm Nhiên Tiêu Hồn Chưởng", "-1/0/0", "0/256/0", false, false, false], ["Huyền Thiết Kiếm pháp", 0, "TSD_33", "Học được cũng thi triển Huyền Thiết Kiếm pháp", "-1/0/0", "0/257/0", false, false, false], ["Thiết Sa Chưởng", 0, "TSD_34", "Học được cũng thi triển Thiết Sa Chưởng", "-1/0/0", "0/258/0", false, false, false], ["Thất Thương quyền", 0, "TSD_35", "Học được cũng thi triển Thất Thương quyền", "-1/0/0", "0/259/0", false, false, false], ["Nhất Dương chỉ", 0, "TSD_36", "Học được cũng thi triển Nhất Dương chỉ", "-1/0/0", "0/260/0", false, false, false], ["Lục Mạch Thần Kiếm", 0, "TSD_37", "Học được cũng thi triển Lục Mạch Thần Kiếm", "-1/0/0", "0/261/0", false, false, false], ["Càn Khôn Đại Na Di", 0, "TSD_38", "Học được cũng thi triển Càn Khôn Đại Na Di", "-1/0/0", "0/262/0", false, false, false], ["Thái Huyền Kinh", 0, "TSD_39", "Học được cũng thi triển Thái Huyền Kinh", "-1/0/0", "0/263/0", false, false, false], ["Đạn Chỉ thần công", 0, "TSD_40", "Học được cũng thi triển Đạn Chỉ thần công", "-1/0/0", "0/264/0", false, false, false], ["Bắc Minh Thần Công", 0, "TSD_41", "Học được cũng thi triển Bắc Minh Thần Công", "-1/0/0", "0/265/0", false, false, false], ["Cáp Mô Công", 0, "TSD_42", "Học được cũng thi triển Cáp Mô Công", "-1/0/0", "0/266/0", false, false, false], ["Tịch Tà kiếm pháp", 0, "TSD_43", "Học được cũng thi triển Tịch Tà kiếm pháp", "-1/0/0", "0/267/0", false, false, false], ["Viên Nguyệt Loan Đao", 0, "TSD_44", "Học được cũng thi triển Viên Nguyệt Loan Đao", "-1/0/0", "0/268/0", false, false, false], ["Vân long phá ba kiếm", 0, "TSD_45", "Học được cũng thi triển vân long phá ba kiếm", "-1/0/0", "0/269/0", false, false, false], ["Hàn băng Huyễn Hồn chưởng", 0, "TSD_46", "Học được cũng thi triển hàn băng Huyễn Hồn chưởng", "-1/0/0", "0/270/0", false, false, false], ["Cửu Dương Thần Công", 0, "TSD_47", "Học được cũng thi triển Cửu Dương Thần Công", "-1/0/0", "0/271/0", false, false, false], ["Thần hành bách biến", 0, "TSD_48", "Học được cũng thi triển thần hành bách biến", "-1/0/0", "0/272/0", false, false, false], ["Lăng Ba Vi Bộ", 0, "TSD_49", "Học được cũng thi triển Lăng Ba Vi Bộ", "-1/0/0", "0/273/0", false, false, false]];

  // END OF ACHIVEMENTS LIST (DO NOT MODIFY FROM HERE)
  this._achList = [];
  for (var i = 0; i < achList.length; i++) {
    var ca = achList[i];
    var a = {
      "name": ca[0],
      "iconIndex": ca[1],
      "imageFile": ca[2],
      "description": ca[3],
      "reward": ca[4],
      "condition": ca[5],
      "hideName": ca[6],
      "hideReward": ca[7],
      "hideDesc": ca[8]
    };
    this._achList.push(a);
  }
};
MUSH_Achievements.prototype.getAchList = function () {
  return this._achList;
};
MUSH_Achievements.prototype.getAchByName = function (name) {
  var a = null;
  for (var i = 0; i < this._achList.length; i++) {
    if (this._achList[i].name == name) {
      a = this._achList[i];
      break;
    }
  }
  if (a != null) {
    return a;
  } else {
    alert("Error! Inform the developper of achievement error 1001");
  }
};
MUSH_Achievements.prototype.getSceneDetails = function () {
  return this._snDetails;
};

// FROM THIS POINT, MODIFY AT YOUR OWN RISK

//==============================================================================================================
// * SECTION B.01: Achievement Scene
//==============================================================================================================

function Scene_mushMenuAchievementP1() {
  this.initialize.apply(this, arguments);
}
Scene_mushMenuAchievementP1.prototype = Object.create(Scene_MenuBase.prototype);
Scene_mushMenuAchievementP1.prototype.constructor = Scene_mushMenuAchievementP1;
Scene_mushMenuAchievementP1.prototype.initialize = function () {
  this._ach = new MUSH_Achievements();
  this._action = 0;
  $gameParty.refreshAchievementVariables();
  Scene_MenuBase.prototype.initialize.call(this);
};
Scene_mushMenuAchievementP1.prototype.start = function () {
  Scene_MenuBase.prototype.start.call(this);
};
Scene_mushMenuAchievementP1.prototype.create = function () {
  Scene_MenuBase.prototype.create.call(this);
  this.createWindowGeneral();
};
Scene_mushMenuAchievementP1.prototype.createWindowGeneral = function () {
  this._windowTitle = new Window_mushMenuAchievementTitle_P1(0, 0, Graphics.width, 144, this._ach);
  this._windowCommand = new Window_mushMenuAchievementCommand_P1(0, this._windowTitle.height, Graphics.width, Graphics.height - this._windowTitle.height, this._ach);
  this._windowCommand.setHandler("cancel", this.popScene.bind(this));
  this._windowCommand.setHandler("ok", this.okInput.bind(this));
  var sd = this._ach.getSceneDetails();
  var whc2h = this._windowCommand.lineHeight() * (sd.heightFactor + 1);
  var wc2h = Graphics.height - this._windowTitle.height - whc2h;
  this._windowCommand2 = new Window_mushMenuAchievementCommand2_P1(0, this._windowTitle.height, Graphics.width, wc2h, this._ach);
  this._windowCommand2.setHandler("cancel", this.popScene.bind(this));
  this._windowCommand2.setHandler("ok", this.okInput.bind(this));
  this._windowHelpCm2 = new Window_mushMenuAchievementCommand_P1(0, this._windowTitle.height + this._windowCommand2.height, Graphics.width, whc2h, this._ach, true);
  this._windowCommand2.setWindowHelp(this._windowHelpCm2);
  this.addChild(this._windowTitle);
  this.addChild(this._windowCommand);
  this.addChild(this._windowCommand2);
  this.addChild(this._windowHelpCm2);
  if (this._ach.getSceneDetails().defaultSceneView == 1) {
    this._windowCommand.activate();
    this._windowCommand.select(0);
    this._windowHelpCm2.hide();
  } else {
    this._windowCommand.hide();
    this._windowCommand2.show();
    this._windowCommand2.activate();
    this._windowCommand2.select(0);
  }
};
Scene_mushMenuAchievementP1.prototype.update = function () {
  Scene_MenuBase.prototype.update.call(this);
};
Scene_mushMenuAchievementP1.prototype.okInput = function () {
  if (this._ach.getSceneDetails().sceneToggle) {
    SoundManager.playOk();
    if (this._windowCommand.visible) {
      this._windowCommand.hide();
      this._windowCommand.deactivate();
      this._windowCommand2.show();
      this._windowCommand2.activate();
      this._windowCommand2.select(this._windowCommand.index());
      this._windowHelpCm2.show();
    } else {
      this._windowCommand2.hide();
      this._windowCommand2.deactivate();
      this._windowHelpCm2.hide();
      this._windowCommand.show();
      this._windowCommand.activate();
      this._windowCommand.select(this._windowCommand2.index());
    }
  }
};

//==============================================================================================================
// * SECTION B.02: Scene Map
//==============================================================================================================

var aliasMush_SceneMapCreate496 = Scene_Map.prototype.create;
Scene_Map.prototype.create = function () {
  aliasMush_SceneMapCreate496.call(this);
  this._dtAch = new MUSH_Achievements();
  this._wPopPeriod = this._dtAch.getSceneDetails().wPopPeriod;
  if (this._wPopPeriod <= 0 && this.achievementSwitchCondition()) {
    this.verifyAchievementCompletion();
  }
};
Scene_Map.prototype.verifyAchievementCompletion = function () {
  var ach = $gameParty.getAchievementVar();
  var activateP = [];
  for (var i = 0; i < ach.length; i++) {
    var a = ach[i];
    if (a.unlocked == false) {
      var ac = $gameParty.getAchievementCond(a.condition);
      if (ac.type == 0) {
        // switches
        if ($gameSwitches.value(ac.value1)) {
          activateP.push(i);
        }
      } else if (ac.type == 1) {
        // variables equal
        if ($gameVariables.value(ac.value1) == ac.value2) {
          activateP.push(i);
        }
      } else if (ac.type == 2) {
        // variables greater or equal
        if ($gameVariables.value(ac.value1) >= ac.value2) {
          activateP.push(i);
        }
      } else if (ac.type == 3) {
        // time (number of frames)
        if (Graphics.frameCount >= ac.value1) {
          activateP.push(i);
        }
      } else if (ac.type == 4) {
        // Party steps
        if ($gameParty.steps() >= ac.value1) {
          activateP.push(i);
        }
      }
    }
  }
  for (var i = 0; i < activateP.length; i++) {
    $gameParty.unlockAchievement(activateP[i]);
    var dt = new MUSH_Achievements();
    $gameParty.giveAchievementReward(dt, activateP[i]);
  }
  if (activateP.length > 0) {
    if (this._dtAch.getSceneDetails().allowPopWindow) {
      this._wAchPop = new Window_mushMenuAchievementPop_P1(0, 0, activateP);
      this._achTimer = 20;
      this._achDone = false;
    }
  }
};
var aliasMush_SceneMapUpdate238 = Scene_Map.prototype.update;
Scene_Map.prototype.update = function () {
  aliasMush_SceneMapUpdate238.call(this);
  if (this._achTimer) {
    if (this._dtAch.getSceneDetails().allowPopWindow) {
      if (this._achTimer > 1) {
        this._achTimer -= 1;
      } else {
        if (!this._achDone) {
          this.addWindow(this._wAchPop);
          this._achDone = true;
        }
      }
    }
  }
  if (this._wPopPeriod > 0) {
    if (Graphics.frameCount % this._wPopPeriod == 0 && this.achievementSwitchCondition()) {
      this.verifyAchievementCompletion();
    }
  }
};
Scene_Map.prototype.achievementSwitchCondition = function () {
  var sw = this._dtAch.getSceneDetails().switchForAch;
  if (sw <= 0) {
    return true;
  } else {
    var cond = $gameSwitches.value(sw);
    return cond;
  }
};

//==============================================================================================================
// * SECTION B.03: Scene Menu
//==============================================================================================================

var aliasMush_SceneMenuInitialize23598 = Scene_Menu.prototype.initialize;
Scene_Menu.prototype.initialize = function () {
  this._dtAch = new MUSH_Achievements();
  aliasMush_SceneMenuInitialize23598.call(this);
};
var aliasMush_SceneMenuCreateCommandWindow28 = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function () {
  aliasMush_SceneMenuCreateCommandWindow28.call(this);
  var dtAch = this._dtAch.getSceneDetails();
  if (dtAch.addToMenu) {
    var symbol = "mushAchievements";
    this._commandWindow.setHandler(symbol, this.commandMushAchievements.bind(this));
  }
};
Scene_Menu.prototype.commandMushAchievements = function () {
  if (this._dtAch.getSceneDetails().switchForAch <= 0) {
    SceneManager.push(Scene_mushMenuAchievementP1); //xiaoruis窗口呼叫
  } else {
    var sw = this._dtAch.getSceneDetails().switchForAch;
    var cond = $gameSwitches.value(sw);
    if (cond) {
      SceneManager.push(Scene_mushMenuAchievementP1);
    } else {
      SoundManager.playBuzzer();
    }
  }
};

//==============================================================================================================
// * SECTION B.04: Scene Load
//==============================================================================================================

var alias_SceneLoadOnLoadSuccess_135h8 = Scene_Load.prototype.onLoadSuccess;
Scene_Load.prototype.onLoadSuccess = function () {
  alias_SceneLoadOnLoadSuccess_135h8.call(this);
  $gameParty.refreshAchievementVariables();
};

//==============================================================================================================
// * SECTION C.01: Window Achievement Title
//==============================================================================================================

function Window_mushMenuAchievementTitle_P1() {
  this.initialize.apply(this, arguments);
}
Window_mushMenuAchievementTitle_P1.prototype = Object.create(Window_Base.prototype);
Window_mushMenuAchievementTitle_P1.prototype.constructor = Window_mushMenuAchievementTitle_P1;
Window_mushMenuAchievementTitle_P1.prototype.initialize = function (x, y, width, height, ach) {
  this._ach = ach;
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this.refresh();
};
Window_mushMenuAchievementTitle_P1.prototype.refresh = function () {
  this.contents.clear();
  var dt = this._ach.getSceneDetails();
  this.contents.fontSize = 32;
  this.drawText(dt.sceneTitle, 0, 0, Graphics.width - 36, "center");
  this.contents.fontSize = 20;
  this.drawCompletion(Math.floor(this.width / 3 * 2));
  this.drawText(dt.sceneDescription, 0, this.lineHeight(), Graphics.width - 36, "center");
};
Window_mushMenuAchievementTitle_P1.prototype.drawCompletion = function (barWidth) {
  var dt = this._ach.getSceneDetails();
  var sx = Math.floor((this.width - 36 - barWidth) / 2);
  var sy = this.lineHeight() * 2 + 20;
  var max = this._ach.getAchList().length;
  var cur = this.getNumberUnlocked();
  var pour = Math.floor(cur / max * 100);
  var dWd = Math.floor(cur / max * barWidth);
  this.contents.fillRect(sx, sy, barWidth, 12, this.gaugeBackColor());
  this.contents.gradientFillRect(sx, sy, dWd, 12, dt.completionColor1, dt.completionColor2, false);
  this.drawText(dt.textCompletion, sx + 8, this.lineHeight() * 2, barWidth / 2);
  this.drawText("" + pour + "%", sx, this.lineHeight() * 2, barWidth - 8, "right");
};
Window_mushMenuAchievementTitle_P1.prototype.getNumberUnlocked = function () {
  var num = 0;
  for (var i = 0; i < $gameParty.getAchievementVar().length; i++) {
    var c = $gameParty.getAchievementVar()[i];
    if (c.unlocked == true) {
      num += 1;
    }
  }
  return num;
};
Window_mushMenuAchievementTitle_P1.prototype.drawTextExCenter = function (text, x, y, width) {
  var lines = text.split("\n", Math.max(this._ach.getSceneDetails().heightFactor - 1, 1));
  for (var i = 0; i < lines.length; i++) {
    this.drawText(lines[i], x, y + this.lineHeight() * i, width, "center");
  }
};

//==============================================================================================================
// * SECTION C.02: Window Achievement Command
//==============================================================================================================

function Window_mushMenuAchievementCommand_P1() {
  this.initialize.apply(this, arguments);
}
;
Window_mushMenuAchievementCommand_P1.prototype = Object.create(Window_Selectable.prototype);
Window_mushMenuAchievementCommand_P1.prototype.constructor = Window_mushMenuAchievementCommand_P1;
Window_mushMenuAchievementCommand_P1.prototype.initialize = function (x, y, width, height, ach, help) {
  this._ach = ach;
  this._sprt = new Sprite_Base();
  this._help = help;
  this._hIndex = -1;
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this.refresh();
  this.addChild(this._sprt);
};
Window_mushMenuAchievementCommand_P1.prototype.maxItems = function () {
  if (this._help) {
    return 1;
  } else {
    return this._ach.getAchList().length;
  }
};
Window_mushMenuAchievementCommand_P1.prototype.itemHeight = function () {
  return this.lineHeight() * this._ach.getSceneDetails().heightFactor;
};
Window_mushMenuAchievementCommand_P1.prototype.refresh = function () {
  for (var i = 0; i < this._sprt.children.length; i++) {
    this._sprt.children[i].renInactive();
  }
  if (this._help == true) {
    // help
  } else {
    Window_Selectable.prototype.refresh.call(this);
  }
};
Window_mushMenuAchievementCommand_P1.prototype.drawItem = function (index, rect) {
  var it = this._ach.getAchList()[index];
  var paAc = $gameParty.getAchievementVar(it.name);
  var sd = this._ach.getSceneDetails();
  var fy = rect.y + Math.floor((this.itemHeight() - sd.logoSize) / 2);
  var fx = rect.x + Math.floor((this.itemHeight() - sd.logoSize) / 2);
  var sx = fx + sd.logoSize + Math.floor((this.itemHeight() - sd.logoSize) / 2);
  var wd = this.width - 36 - sx;
  if (it.imageFile != "" && it.imageFile != undefined && it.imageFile != null) {
    var sprt = new Sprite_ImageLogo_P1(it.imageFile);
    sprt.x = fx + 18;
    sprt.y = fy + 18;
    if (paAc.unlocked == false) {
      if (sd.spriteNotUnlocked != "" && sd.spriteNotUnlocked != undefined && sd.spriteNotUnlocked != null) {
        sprt.bitmap = ImageManager.xiaoCJ(sd.spriteNotUnlocked);
      } else {
        sprt.setColorTone([-255, -255, -255, 0]);
      }
    }
    this._sprt.addChild(sprt);
  } else {
    if (paAc.unlocked == false) {
      this.drawIconPlusZoom(sd.iconNotUnlocked, fx, fy, sd.logoSize / 32);
    } else {
      this.drawIconPlusZoom(it.iconIndex, fx, fy, sd.logoSize / 32);
    }
  }
  if (paAc.unlocked == false) {
    this.changeColor2(paAc.unlocked, sd);
    if (it.hideName) {
      this.drawText("?????", sx, rect.y, wd);
    } else {
      this.drawText(it.name, sx, rect.y, wd);
    }
    var n = this.changeColor1(paAc.unlocked, sd);
    if (sd.showReward) {
      if (it.hideReward) {
        var name = "?????";
      } else {
        var name = this.getRewardName(it, sd);
      }
      //this.drawTextEx("\\c[" + n + "]" + sd.textReward + name, sx, rect.y + this.lineHeight());
      if (it.hideDesc) {
        this.drawTextEx("\\c[" + n + "]" + "????????", sx, rect.y + this.lineHeight() * 1);
      } else {
        this.drawTextEx("\\c[" + n + "]" + it.description, sx, rect.y + this.lineHeight() * 1);
      }
    } else {
      if (it.hideDesc) {
        this.drawTextEx("\\c[" + n + "]" + "????????", sx, rect.y + this.lineHeight() * 1);
      } else {
        this.drawTextEx("\\c[" + n + "]" + it.description, sx, rect.y + this.lineHeight() * 1);
      }
    }
  } else {
    this.changeColor2(paAc.unlocked, sd);
    this.drawText(it.name, sx, rect.y, wd);
    var n = this.changeColor1(paAc.unlocked, sd);
    if (sd.showReward) {
      var name = this.getRewardName(it, sd);
      //this.drawTextEx("\\c[" + n + "]" + sd.textReward + name, sx, rect.y + this.lineHeight());
      this.drawTextEx("\\c[" + n + "]" + it.description, sx, rect.y + this.lineHeight() * 1);
    } else {
      this.drawTextEx("\\c[" + n + "]" + it.description, sx, rect.y + this.lineHeight() * 1);
    }
  }
};
Window_mushMenuAchievementCommand_P1.prototype.changeColor1 = function (unlocked, sd) {
  if (unlocked == true) {
    this.changeTextColor(this.resetTextColor());
    return 0;
  } else {
    var n = sd.textColorNotUnlocked;
    this.changeTextColor(this.textColor(n));
    return n;
  }
};
Window_mushMenuAchievementCommand_P1.prototype.changeColor2 = function (unlocked, sd) {
  if (unlocked == true) {
    this.changeTextColor(this.systemColor());
  } else {
    var n = sd.textColorNotUnlocked;
    this.changeTextColor(this.textColor(n));
  }
};
Window_mushMenuAchievementCommand_P1.prototype.drawIconPlusZoom = function (iconIndex, x, y, zoom) {
  var bitmap = ImageManager.loadSystem("IconSet");
  var pw = Window_Base._iconWidth;
  var ph = Window_Base._iconHeight;
  var sx = iconIndex % 16 * pw;
  var sy = Math.floor(iconIndex / 16) * ph;
  var zoomValue = pw * zoom;
  this.contents.blt(bitmap, sx, sy, pw, ph, x, y, zoomValue, zoomValue);
};
Window_mushMenuAchievementCommand_P1.prototype.getRewardName = function (it, sd) {
  /*	var s = $gameParty.getAchievementReward(it.reward);
  	if (s.category < 3 && s.category >= 0) {
  		if (s.category == 0) var dt = $dataItems;
  		if (s.category == 1) var dt = $dataArmors;
  		if (s.category == 2) var dt = $dataWeapons;
  		var r = dt[s.index];
  		var text = "" + r.name + "\\i[" + r.iconIndex + "]" + " ﹢" + s.amount;
  		return text;
  	} else if (s.category == 3) {
  		var text = "" + "银两"+ "\\i[24]"+" ﹢"+s.amount;
  		return text;
  	} else {
  		return sd.textNoReward;
  	}*/
};
Window_mushMenuAchievementCommand_P1.prototype.drawAllItems = function () {
  var topIndex = this.topIndex();
  for (var i = 0; i < this.maxPageItems(); i++) {
    var index = topIndex + i;
    if (index < this.maxItems()) {
      var rect = this.itemRectForText(index);
      this.drawItem(index, rect);
    }
  }
};
Window_mushMenuAchievementCommand_P1.prototype.update = function () {
  Window_Selectable.prototype.update.call(this);
  for (var i = 0; i < this._sprt.children.length; i++) {
    if (this._sprt.children[i].getRepos() == false) {
      if (this._sprt.children[i].width && this._sprt.children[i].height) {
        var scaleX = this._ach.getSceneDetails().logoSize / this._sprt.children[i].width;
        var scaleY = this._ach.getSceneDetails().logoSize / this._sprt.children[i].height;
        this._sprt.children[i].setCorrection(scaleX, scaleY);
      }
    }
  }
  ;
};
Window_mushMenuAchievementCommand_P1.prototype.updateHelp = function (index) {
  if (this._hIndex != index) {
    this._hIndex = index;
    if (this._hIndex >= 0 && this._hIndex <= this._ach.getAchList().length - 1) {
      this.contents.clear();
      for (var i = 0; i < this._sprt.children.length; i++) {
        this._sprt.children[i].renInactive();
      }
      var rect = this.itemRectForText(0);
      this.drawItem(this._hIndex, rect);
    } else {
      this.contents.clear();
      for (var i = 0; i < this._sprt.children.length; i++) {
        this._sprt.children[i].renInactive();
      }
    }
  }
};

//==============================================================================================================
// * SECTION C.03: Window Achievement Pop
//==============================================================================================================

function Window_mushMenuAchievementPop_P1() {
  this.initialize.apply(this, arguments);
}
Window_mushMenuAchievementPop_P1.prototype = Object.create(Window_Base.prototype);
Window_mushMenuAchievementPop_P1.prototype.constructor = Window_mushMenuAchievementPop_P1;
Window_mushMenuAchievementPop_P1.prototype.initialize = function (x, y, achs) {
  AudioManager.playSe({
    "name": "UI003_Levelup2",
    "volume": 40,
    "pitch": 100,
    "pan": 0
  });
  this._dt = new MUSH_Achievements();
  this._achs = achs;
  Window_Base.prototype.initialize.call(this, x - 18, y + 105, Graphics.width + 50, 216); //xiaoruis成就显示
  this._aUpdate = true;
  this._timer = 150;
  this._pos = 0;
  this.opacity = 0;
  this.contentsOpacity = 0;
  this.refresh();
};
Window_mushMenuAchievementPop_P1.prototype.refresh = function () {
  this.contents.clear();
  var tx = this._dt.getSceneDetails().textPop;
  var wd = this._dt.getSceneDetails().wPopWidth;
  var color1 = this._dt.getSceneDetails().wPopColor1;
  var color2 = this._dt.getSceneDetails().wPopColor2;
  this.contents.gradientFillRect(0, 0, wd, this._achs.length / 2 * this.lineHeight(), color1, color2, true);
  this.contents.gradientFillRect(0, this._achs.length / 2 * this.lineHeight(), wd, this._achs.length / 2 * this.lineHeight(), color2, color1, true);
  for (var i = 0; i < this._achs.length; i++) {
    var c = this._achs[i];
    var name = $gameParty.getAchievementVar()[c].name;
    var icon = this._dt.getAchByName(name).iconIndex;
    var text = tx + "\\c[16]" + name + " " + "\\i[" + icon + "]";
    this.drawTextEx(text, 8, this.lineHeight() * i);
  }
};
Window_mushMenuAchievementPop_P1.prototype.update = function () {
  Window_Base.prototype.update.call(this);
  if (this._aUpdate) {
    if (this._timer > 0) {
      this._timer -= 1;
      if (this.contentsOpacity < 255) {
        this.contentsOpacity += 3;
      }
    } else {
      if (this.contentsOpacity > 0) {
        this.contentsOpacity -= 3;
      } else {
        this._aUpdate = false;
        this.hide();
      }
    }
    if ($gameMessage.isBusy()) {
      var corPos = 0;
      var pt = $gameMessage.positionType();
      if ($gameMessage.hasText()) {
        if (pt == 0) {
          corPos = 1;
        }
      }
      if (this._pos != corPos) {
        this._pos = corPos + 0;
        this.replaceWindowY();
      }
    } else {
      if (this._pos != 0) {
        this._pos = 0;
        this.replaceWindowY();
      }
    }
  }
};
Window_mushMenuAchievementPop_P1.prototype.endProcess = function () {
  this._aUpdate = false;
  this._timer = 0;
  this.hide();
};
Window_mushMenuAchievementPop_P1.prototype.replaceWindowY = function () {
  if (this._pos == 0) {
    this.y = 0;
  } else if (this._pos == 1) {
    this.y = Graphics.height - this.height;
  }
};

//==============================================================================================================
// * SECTION C.04: Window Achievement Command 2
//==============================================================================================================

function Window_mushMenuAchievementCommand2_P1() {
  this.initialize.apply(this, arguments);
}
;
Window_mushMenuAchievementCommand2_P1.prototype = Object.create(Window_Selectable.prototype);
Window_mushMenuAchievementCommand2_P1.prototype.constructor = Window_mushMenuAchievementCommand2_P1;
Window_mushMenuAchievementCommand2_P1.prototype.initialize = function (x, y, width, height, ach) {
  this._ach = ach;
  this._sprt = new Sprite_Base();
  Window_Selectable.prototype.initialize.call(this, x, y, width, height); //xiaoruis成就中框
  this.hide();
  this.deactivate();
  this.refresh();
  this.addChild(this._sprt);
};
Window_mushMenuAchievementCommand2_P1.prototype.maxItems = function () {
  return this._ach.getAchList().length;
};
Window_mushMenuAchievementCommand2_P1.prototype.itemHeight = function () {
  return this._ach.getSceneDetails().logoSize + this.spacing();
};
Window_mushMenuAchievementCommand2_P1.prototype.itemWidth = function () {
  return this._ach.getSceneDetails().logoSize + this.spacing();
};
Window_mushMenuAchievementCommand2_P1.prototype.maxCols = function () {
  var cols = Math.floor((this.width - 36) / (this.itemWidth() + this.spacing()));
  return cols;
};
Window_mushMenuAchievementCommand2_P1.prototype.refresh = function () {
  for (var i = 0; i < this._sprt.children.length; i++) {
    this._sprt.children[i].renInactive();
  }
  Window_Selectable.prototype.refresh.call(this);
};
Window_mushMenuAchievementCommand2_P1.prototype.update = function () {
  Window_Selectable.prototype.update.call(this);
  for (var i = 0; i < this._sprt.children.length; i++) {
    if (this._sprt.children[i].getRepos() == false) {
      if (this._sprt.children[i].width && this._sprt.children[i].height) {
        var scaleX = this._ach.getSceneDetails().logoSize / this._sprt.children[i].width;
        var scaleY = this._ach.getSceneDetails().logoSize / this._sprt.children[i].height;
        this._sprt.children[i].setCorrection(scaleX, scaleY);
      }
    }
  }
  ;
  if (this._windowHelp) {
    this._windowHelp.updateHelp(this.index());
  }
};
Window_mushMenuAchievementCommand2_P1.prototype.setWindowHelp = function (windowHelp) {
  this._windowHelp = windowHelp;
};
Window_mushMenuAchievementCommand2_P1.prototype.drawItem = function (index) {
  var rect = this.itemRectForText(index);
  var it = this._ach.getAchList()[index];
  var paAc = $gameParty.getAchievementVar(it.name);
  var sd = this._ach.getSceneDetails();
  var fy = rect.y + this.spacing() / 2;
  var fx = rect.x + this.spacing() / 2;
  if (it.imageFile != "" && it.imageFile != undefined && it.imageFile != null) {
    var sprt = new Sprite_ImageLogo_P1(it.imageFile);
    sprt.x = fx + 38; //xiaoruis
    sprt.y = fy + 18;
    if (paAc.unlocked == false) {
      if (sd.spriteNotUnlocked != "" && sd.spriteNotUnlocked != undefined && sd.spriteNotUnlocked != null) {
        sprt.bitmap = ImageManager.xiaoCJ(sd.spriteNotUnlocked);
      } else {
        sprt.setColorTone([-255, -255, -255, 0]);
      }
    }
    this._sprt.addChild(sprt);
  } else {
    if (paAc.unlocked == false) {
      this.drawIconPlusZoom(sd.iconNotUnlocked, fx, fy, sd.logoSize / 32);
    } else {
      this.drawIconPlusZoom(it.iconIndex, fx, fy, sd.logoSize / 32);
    }
  }
};
Window_mushMenuAchievementCommand2_P1.prototype.drawIconPlusZoom = function (iconIndex, x, y, zoom) {
  var bitmap = ImageManager.loadSystem("IconSet");
  var pw = Window_Base._iconWidth;
  var ph = Window_Base._iconHeight;
  var sx = iconIndex % 16 * pw;
  var sy = Math.floor(iconIndex / 16) * ph;
  var zoomValue = pw * zoom;
  this.contents.blt(bitmap, sx, sy, pw, ph, x, y, zoomValue, zoomValue);
};
Window_mushMenuAchievementCommand2_P1.prototype.itemRectForText = function (index) {
  var rect = this.itemRect(index);
  return rect;
};

//==============================================================================================================
// * SECTION C.05: Window Menu Command
//==============================================================================================================

var aliasMush_WindowMenuCommandMakeCommandList59 = Window_MenuCommand.prototype.makeCommandList;
Window_MenuCommand.prototype.makeCommandList = function () {
  aliasMush_WindowMenuCommandMakeCommandList59.call(this);
  var dtAch = new MUSH_Achievements().getSceneDetails();
  if (dtAch.addToMenu) this.addAchievementCommand(dtAch);
};
Window_MenuCommand.prototype.addAchievementCommand = function (dtAch) {
  if (this.needsCommand(dtAch.sceneTitle)) {
    if (dtAch.switchForAch <= 0) {
      var enabled = true;
      var name = dtAch.sceneTitle;
    } else {
      var sw = dtAch.switchForAch;
      var enabled = $gameSwitches.value(sw);
      if (enabled) {
        var name = dtAch.sceneTitle;
      } else {
        var name = "?????";
      }
    }
    this.addCommand(name, "mushAchievements", enabled);
    this.repositionAchievements();
  }
};
Window_MenuCommand.prototype.repositionAchievements = function () {
  var itemCollector = null;
  for (var i = 0; i < this._list.length; i++) {
    if (this._list[i].symbol == "mushAchievements") {
      itemCollector = this._list[i];
      this._list.splice(i, 1);
      break;
    }
  }
  for (var i = 0; i < this._list.length; i++) {
    if (this._list[i].symbol == "options") {
      if (itemCollector != null) {
        this._list.splice(i, 0, itemCollector);
        break;
      }
    }
  }
};

//==============================================================================================================
// * SECTION D.01: Sprite Image Logo
//==============================================================================================================

function Sprite_ImageLogo_P1() {
  this.initialize.apply(this, arguments);
}
;
Sprite_ImageLogo_P1.prototype = Object.create(Sprite_Base.prototype);
Sprite_ImageLogo_P1.prototype.constructor = Sprite_ImageLogo_P1;
Sprite_ImageLogo_P1.prototype.initialize = function (bitmap, ach) {
  this._ach = ach;
  Sprite_Base.prototype.initialize.call(this);
  this.bitmap = ImageManager.xiaoCJ(bitmap, 0);
  this._repos = false;
};
Sprite_ImageLogo_P1.prototype.getRepos = function () {
  return this._repos;
};
Sprite_ImageLogo_P1.prototype.renInactive = function () {
  this.hide();
  this._repos = true;
};
Sprite_ImageLogo_P1.prototype.setCorrection = function (scaleX, scaleY) {
  this.scale.x = scaleX;
  this.scale.y = scaleY;
  this._repos = true;
};

//==============================================================================================================
// * SECTION E.01: Game Party
//==============================================================================================================

var aliasMush_GamePartyInitialize25698 = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function () {
  aliasMush_GamePartyInitialize25698.call(this);
  this.createAchievementVariables();
};
Game_Party.prototype.createAchievementVariables = function () {
  if (this._achVr) {
    // do nothing
  } else {
    this._achVr = [];
    var d = new MUSH_Achievements().getAchList();
    for (var i = 0; i < d.length; i++) {
      this.addAchievementVariable(d[i].name, d[i].condition);
    }
  }
};
Game_Party.prototype.refreshAchievementVariables = function () {
  this.createAchievementVariables();
  var d = new MUSH_Achievements().getAchList();
  for (var i = 0; i < d.length; i++) {
    var c = this.getAchievementVar(d[i].name);
    if (c == null || c == undefined) {
      this.addAchievementVariable(d[i].name, d[i].condition);
    } else {
      if (c.condition != d[i].condition) {
        this.modifyAchievementVar(c.name, d[i].condition, false);
      }
    }
  }
};
Game_Party.prototype.addAchievementVariable = function (name, condition) {
  var dd = {
    "name": name,
    "condition": condition,
    "unlocked": false
  };
  this._achVr.push(dd);
};
Game_Party.prototype.modifyAchievementVar = function (name, newCond, reset) {
  for (var i = 0; i < this._achVr.length; i++) {
    if (this._achVr[i].name == name) {
      this._achVr[i].condition = newCond;
      if (reset == true) {
        this._achVr[i].unlocked = false;
      }
      break;
    }
  }
};
Game_Party.prototype.getAchievementVar = function (name) {
  if (name) {
    var a = null;
    for (var i = 0; i < this._achVr.length; i++) {
      if (this._achVr[i].name == name) {
        a = this._achVr[i];
        break;
      }
    }
    return a;
  } else {
    return this._achVr;
  }
};
Game_Party.prototype.unlockAchievement = function (index) {
  this._achVr[index].unlocked = true;
};
Game_Party.prototype.giveAchievementReward = function (dt, index) {
  var a = this._achVr[index];
  var ad = dt.getAchByName(a.name);
  var rw = this.getAchievementReward(ad.reward);
  if (rw.category == 0) {
    var it = $dataItems[rw.index];
    this.gainItem(it, rw.amount, false);
  } else if (rw.category == 1) {
    var it = $dataArmors[rw.index];
    this.gainItem(it, rw.amount, false);
  } else if (rw.category == 2) {
    var it = $dataWeapons[rw.index];
    this.gainItem(it, rw.amount, false);
  } else if (rw.category == 3) {
    this.gainGold(rw.amount);
  }
};
Game_Party.prototype.getAchievementReward = function (rwd) {
  var sts = rwd.split("/");
  if (sts.length < 3) {
    alert("Check your '/' in the achievements list's reward parts.");
    return "error!";
  } else {
    var s = {
      "category": Number(sts[0]),
      "index": Number(sts[1]),
      "amount": Number(sts[2])
    };
    return s;
  }
};
Game_Party.prototype.getAchievementCond = function (cdn) {
  var sts = cdn.split("/");
  if (sts.length < 3) {
    alert("Check your '/' in the achievements list's condition parts.");
    return "error!";
  } else {
    var s = {
      "type": Number(sts[0]),
      "value1": Number(sts[1]),
      "value2": Number(sts[2])
    };
    return s;
  }
};
