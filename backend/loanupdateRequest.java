package com.example.payload.request;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


public class loanupdateRequest {
//		@Id
//		@GeneratedValue(strategy = GenerationType.AUTO)
//		private Long id;
		@Id
		private String kn_number;
		private String gold;
		private String weight;
		private String bought_from;
		private String jeweler_name;
		private String account_holder_name;
		private String type;
		private String account_number;
		private String ifsc_code;
		private String bank_name;
		private String branch_name;
		private String status;
		private String rid;
		
		public loanupdateRequest() {
			
		}
		
		
		public loanupdateRequest(String kn_number, String gold, String weight, String bought_from, String jeweler_name,
				String account_holder_name, String type, String account_number, String ifsc_code, String bank_name,
				String branch_name, String status, String rid) {
			super();
			this.kn_number = kn_number;
			this.gold = gold;
			this.weight = weight;
			this.bought_from = bought_from;
			this.jeweler_name = jeweler_name;
			this.account_holder_name = account_holder_name;
			this.type = type;
			this.account_number = account_number;
			this.ifsc_code = ifsc_code;
			this.bank_name = bank_name;
			this.branch_name = branch_name;
			this.status = status;
			this.rid = rid;
		}
		public String getKn_number() {
			return kn_number;
		}
		public void setKn_number(String kn_number) {
			this.kn_number = kn_number;
		}
		public String getGold() {
			return gold;
		}
		public void setGold(String gold) {
			this.gold = gold;
		}
		public String getWeight() {
			return weight;
		}
		public void setWeight(String weight) {
			this.weight = weight;
		}
		public String getBought_from() {
			return bought_from;
		}
		public void setBought_from(String bought_from) {
			this.bought_from = bought_from;
		}
		public String getJeweler_name() {
			return jeweler_name;
		}
		public void setJeweler_name(String jeweler_name) {
			this.jeweler_name = jeweler_name;
		}
		public String getAccount_holder_name() {
			return account_holder_name;
		}
		public void setAccount_holder_name(String account_holder_name) {
			this.account_holder_name = account_holder_name;
		}
		public String getType() {
			return type;
		}
		public void setType(String type) {
			this.type = type;
		}
		public String getAccount_number() {
			return account_number;
		}
		public void setAccount_number(String account_number) {
			this.account_number = account_number;
		}
		public String getIfsc_code() {
			return ifsc_code;
		}
		public void setIfsc_code(String ifsc_code) {
			this.ifsc_code = ifsc_code;
		}
		public String getBank_name() {
			return bank_name;
		}
		public void setBank_name(String bank_name) {
			this.bank_name = bank_name;
		}
		public String getBranch_name() {
			return branch_name;
		}
		public void setBranch_name(String branch_name) {
			this.branch_name = branch_name;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public String getRid() {
			return rid;
		}
		public void setRid(String rid) {
			this.rid = rid;
		}


		@Override
		public String toString() {
			return "loanupdateRequest [kn_number=" + kn_number + ", gold=" + gold + ", weight=" + weight
					+ ", bought_from=" + bought_from + ", jeweler_name=" + jeweler_name + ", account_holder_name="
					+ account_holder_name + ", type=" + type + ", account_number=" + account_number + ", ifsc_code="
					+ ifsc_code + ", bank_name=" + bank_name + ", branch_name=" + branch_name + ", status=" + status
					+ ", rid=" + rid + "]";
		}
		
		
		
		



}